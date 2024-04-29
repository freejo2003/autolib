#include <Arduino.h>
//#include <WiFi.h>               //we are using the ESP32
#include <ESP8266WiFi.h>      // uncomment this line if you are using esp8266 and comment the line above
#include <Firebase_ESP_Client.h>
#include <SPI.h>
#include <MFRC522.h>
//Provide the token generation process info.
#include "addons/TokenHelper.h"
//Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"
#include <ESP8266WebServer.h>
#include <Servo.h>

// Insert your network credentials
#define WIFI_SSID "alxxeeyyy"
#define WIFI_PASSWORD "flowerpot"


ESP8266WebServer server(80);

Servo servo;

// Insert Firebase project API Key
#define API_KEY "AIzaSyA6K9iL1iBaNpoWbS5S4fnIo3sHxxTBgzY"

// Insert RTDB URLefine the RTDB URL */
#define DATABASE_URL "https://library-ccdfe-default-rtdb.firebaseio.com/" 
//-----------------------------------------

#define RST_PIN  D3
#define SS_PIN   D4
#define BUZZER   D2
//-----------------------------------------
MFRC522 mfrc522(SS_PIN, RST_PIN);
MFRC522::MIFARE_Key key;  
MFRC522::StatusCode status;      
//-----------------------------------------
/* Be aware of Sector Trailer Blocks */
int blockNum = 2;  
/* Create another array to read data from Block */
/* Legthn of buffer should be 2 Bytes more than the size of Block (16 Bytes) */
byte bufferLen = 100;
byte readBlockData[100];
//-----------------------------------------
String card_holder_name;



//-----------------------------------------
//Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
int value;

bool signupOK = false;                     //since we are doing an anonymous sign in 

void setup(){
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.println("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  /* Sign up */
  if (Firebase.signUp(&config, &auth, "", "")){
    Serial.println("ok");
    signupOK = true;
  }
  else{
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h
  
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
  pinMode(BUZZER, OUTPUT);


  // Initialize servo
  servo.attach(D1); 
  servo.write(0);

  server.on("/servo=0", HTTP_GET, []() {
    servo.write(0);
    server.send(200, "text/plain", "Servo turned ON");
  });

  server.on("/servo=1", HTTP_GET, []() {
    servo.write(90);
    server.send(200, "text/plain", "Servo turned OFF");
  });

  server.begin();
  Serial.println("HTTP server started");


  //--------------------------------------------------
  /* Initialize SPI bus */
  SPI.begin();
}

void loop(){
  

  server.handleClient();
    mfrc522.PCD_Init();
  /* Look for new cards */
  /* Reset the loop if no new card is present on RC522 Reader */
  if ( ! mfrc522.PICC_IsNewCardPresent()) {return;}
  /* Select one of the cards */
  if ( ! mfrc522.PICC_ReadCardSerial()) {return;}
  /* Read data from the same block */
  //--------------------------------------------------
  Serial.println();
  Serial.println(F("Reading last data from RFID..."));
  ReadDataFromBlock(blockNum, readBlockData);
  /* If you want to print the full memory dump, uncomment the next line */
  //mfrc522.PICC_DumpToSerial(&(mfrc522.uid));
  
  /* Print the data read from block */
  Serial.println();
  Serial.print(blockNum);
  Serial.print(F(" --> "));
  for (int j=0 ; j<4 ; j++)
  {
    Serial.write(readBlockData[j]);
  }
  Serial.println();
  //--------------------------------------------------
  digitalWrite(BUZZER, HIGH);
  delay(200);
  digitalWrite(BUZZER, LOW);
  delay(200);
  String str = String("books/") + String((char*)readBlockData) + String("/availability");
  Serial.println(str);
  bool boolValue;
  

  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 500 || sendDataPrevMillis == 0))
  {
    sendDataPrevMillis = millis();
    // Write an Int number on the database path test/int
    if (Firebase.RTDB.getBool(&fbdo, str)) {
      if(fbdo.boolData() == true){
        Serial.println("VALUE: " + String(fbdo.boolData()));
        boolValue=false;
      }
      else{
        Serial.println("VALUE: " + String(fbdo.boolData()));
        boolValue=true;
      }
  
      if (Firebase.RTDB.setBool(&fbdo, str, boolValue)) {
        Serial.println("Value updated to " + boolValue);
      }
      else {
        Serial.println("Failed to update value, error: " + fbdo.errorReason());
      }
    } 
    else {
      Serial.println("Failed to read value, error: " + fbdo.errorReason());
    }
  }
  delay(1000);
}





void ReadDataFromBlock(int blockNum, byte readBlockData[]) 
{ 
  //----------------------------------------------------------------------------
  /* Prepare the ksy for authentication */
  /* All keys are set to FFFFFFFFFFFFh at chip delivery from the factory */
  for (byte i = 0; i < 6; i++) {
    key.keyByte[i] = 0xFF;
  }
  //----------------------------------------------------------------------------
  /* Authenticating the desired data block for Read access using Key A */
  status = mfrc522.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, blockNum, &key, &(mfrc522.uid));
  //----------------------------------------------------------------------------s
  if (status != MFRC522::STATUS_OK){
     Serial.print("Authentication failed for Read: ");
     Serial.println(mfrc522.GetStatusCodeName(status));
     return;
  }
  //----------------------------------------------------------------------------
  else {
    Serial.println("Authentication success");
  }
  //----------------------------------------------------------------------------
  /* Reading data from the Block */
  status = mfrc522.MIFARE_Read(blockNum, readBlockData, &bufferLen);
  if (status != MFRC522::STATUS_OK) {
    Serial.print("Reading failed: ");
    Serial.println(mfrc522.GetStatusCodeName(status));
    return;
  }
  //----------------------------------------------------------------------------
  else {
    Serial.println("Block was read successfully");  
  }
  //----------------------------------------------------------------------------
}
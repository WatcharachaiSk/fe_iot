#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <Arduino_JSON.h>
#define OLED_RESET -1// Include DHT library
#include <Adafruit_GFX.h>             // Include OLED library
#include <Adafruit_SSD1306.h>         // Include OLED library
#define OLED_RESET -1
#define WIRE Wire
Adafruit_SSD1306 OLED = Adafruit_SSD1306(128, 32, &WIRE);

const char* ssid = "HUAWEI-P30";
const char* password = "1111122222";
const int output5 = D0;
const int SW = D4;
String APIUrl = "http://192.168.43.42/lab6_iot/";


unsigned long lastTime = 0;
unsigned long timerDelay = 10000;

String jsonBuffer;

void setup() {
  pinMode(SW, INPUT);
  pinMode(output5, OUTPUT);
  OLED.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());

  Serial.println("Timer set to 10 seconds (timerDelay variable), it will take 10 seconds before publishing the first reading.");
}

void loop() {
  //  if (digitalRead(SW) == LOW ) {
  //    while (digitalRead(SW) == LOW) {
  //      delay(120);
  //    }
  //  }


  // Send an HTTP GET request
  if ((millis() - lastTime) > timerDelay) {
    // Check WiFi connection status
    if (WiFi.status() == WL_CONNECTED) {
      String serverPath = APIUrl + "readphp.php?id=1" ;

      jsonBuffer = httpGETRequest(serverPath.c_str());
      Serial.print("JsonBuffer: ");
      Serial.println(jsonBuffer);
      if (String(jsonBuffer) == "on" ) {
        digitalWrite( output5 , HIGH);
        if (digitalRead(SW) == LOW ) {
          while (digitalRead(SW) == LOW) {
            //delay(120);
            Serial.println("postAPI.php?statusGET=off");
          }
          String serverPath = APIUrl + "postAPI.php?statusGET=off";
           jsonBuffer = httpGETRequest(serverPath.c_str());
          digitalWrite( output5 , LOW);
        }
      } else {
        digitalWrite( output5 , LOW);
        if (digitalRead(SW) == LOW ) {
          while (digitalRead(SW) == LOW) {
          //delay(10);
            Serial.println("postAPI.php?statusGET=on");
          }
          String serverPath = APIUrl + "postAPI.php?statusGET=on" ;
           jsonBuffer = httpGETRequest(serverPath.c_str());
          digitalWrite( output5 , HIGH);
        }
      }
    }
    else {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }
}

String httpGETRequest(const char* serverName) {
  WiFiClient client;
  HTTPClient http;

  // Your IP address with path or Domain name with URL path
  http.begin(client, serverName);

  // Send HTTP POST request
  int httpResponseCode = http.GET();

  String payload = "{}";

  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    payload = http.getString();
  }
  else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  // Free resources
  http.end();

  return payload;
}

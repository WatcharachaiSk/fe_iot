#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <Arduino_JSON.h>
#define OLED_RESET -1// Include DHT library
#include <Adafruit_GFX.h>             // Include OLED library
#include <Adafruit_SSD1306.h>         // Include OLED library
//#define OLED_RESET -1
//#define WIRE Wire
//Adafruit_SSD1306 OLED = Adafruit_SSD1306(128, 32, &WIRE);

const char* ssid = "HUAWEI-P30";
const char* password = "1111122222";
//const int output5 = 16;
//const int SW = 2  ;
String APIUrl = "http://192.168.43.112:3200/api";


unsigned long lastTime = 0;
unsigned long timerDelay = 10000;

String jsonBuffer;

#include "DHT.h"
#define DHTTYPE DHT22
#define DHTPIN 14
// Initialize DHT sensor.
DHT dht(DHTPIN, DHTTYPE, 15);

void setup() {
  //  pinMode(SW, INPUT);
  //  pinMode(output5, OUTPUT);

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
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  float f = dht.readTemperature(true);

  if (isnan(h) || isnan(t) || isnan(f))
  {
    Serial.println("Failed to read from DHT sensor!");
      delay(120);
  } else
  {
    // Send an HTTP GET request
    if ((millis() - lastTime) > timerDelay) {
      // Check WiFi connection status
      if (WiFi.status() == WL_CONNECTED) {
        String serverPath = APIUrl + "/create_dht22?temperature=" + t + "&humidity=" + h ;

        jsonBuffer = httpGETRequest(serverPath.c_str());
        Serial.print("JsonBuffer: ");
        Serial.println(jsonBuffer);

        delay(60000);
      }
      else {
        Serial.println("WiFi Disconnected");
      }
      lastTime = millis();
    }

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

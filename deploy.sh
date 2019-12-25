#!/bin/bash

LOG_FILE="log.txt"
function timestamp(){
  echo "[$(date +%Y-%m-%d_%H-%M-%S)]"
}

echo "" >> "$LOG_FILE" && \
printf "$(timestamp) Checkout deploy branch ..." >> "$LOG_FILE" && \
git checkout v0.1.0/master && \
echo "OK" >> "$LOG_FILE" && \

printf "$(timestamp) Pull new codes ..........." >> "$LOG_FILE" && \
git pull && \
echo "OK" >> "$LOG_FILE" && \

printf "$(timestamp) Install deps ............." >> "$LOG_FILE" && \
npm install && \
echo "OK" >> "$LOG_FILE" && \

echo "$(timestamp) SUCCESS!" >> "$LOG_FILE"

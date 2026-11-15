from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
wait = WebDriverWait(driver, 20)

try:
    driver.get("http://localhost:5175/")
    driver.maximize_window()

    print("Current page:", driver.title)

    print("INPUT FIELDS:")
    for item in driver.find_elements(By.TAG_NAME, "input"):
        print(item.get_attribute("placeholder"))

    print("BUTTONS:")
    for item in driver.find_elements(By.TAG_NAME, "button"):
        print(item.text)

    driver.quit()
    
finally:
    driver.quit()



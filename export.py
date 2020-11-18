import requests
import json

from urllib.request import urlopen
from lxml import etree
from io import BytesIO

def hexstr_to_list(hexstr):
    """Convert hex to rgb list"""
    if hexstr[0] == "#":
        hexstr = hexstr.lstrip("#")
    return list(int(hexstr[i:i+2], 16) for i in (0, 2, 4))

def fetch(url):
    headers = {'Content-Type': 'text/html',}
    response = requests.get(url, headers=headers)
    return response.text

def str_to_tree(response):
    """Take xml string return tree object"""
    htmlparser = etree.HTMLParser()
    fileobj = BytesIO(str.encode(response))
    return etree.parse(fileobj, htmlparser)

def fetchnparse(url):
    """Fetch url return document root."""
    html = fetch(url)
    tree = str_to_tree(html)
    return tree.getroot()

def montanablack():
    url = "https://www.montana-cans.com/en/spray-cans/montana-spray-paint/black-50ml-600ml-graffiti-paint/montana-black-400ml"
    root = fetchnparse(url)
    colors = []
    for label in root.findall(".//label"):
        color = hexstr_to_list(label.attrib["data-hex"])
        color.append(label.attrib["data-title"])
        colors.append(color)
    return colors

def mtn94():
    url = "https://www.montanacolors.com/en/productos/mtn-94/"
    root = fetchnparse(url)
    colors = []
    for element in root.findall(".//div[@class='m-info_text']"):
        name, cmyk, hexvalue, pantine = element.findall(".//span")
        try:
            color = hexstr_to_list(hexvalue.text)
        except TypeError as E:
            continue
        color.append(name.text)
        colors.append(color)
    return colors


if __name__ == "__main__":
    with open("blk.json", "w") as blk:
        blk.write(json.dumps(montanablack()))
    with open("mtn.json", "w") as mtn:
        mtn.write(json.dumps(mtn94()))

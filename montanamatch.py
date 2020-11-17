import requests
from urllib.request import urlopen
from lxml import etree
from io import BytesIO

commodore64 = ["#000000", "#FFFFFF", "#68372B", "#70A4B2",
               "#6F3D86", "#588D43", "#352879", "#B8C76F",
               "#6F4F25", "#433900", "#9A6759", "#444444", 
               "#6C6C6C", "#9AD284", "#6C5EB5", "#959595"]

URL="https://www.montana-cans.com/en/spray-cans/montana-spray-paint/black-50ml-600ml-graffiti-paint/montana-black-400ml"


def hexstr_to_list(hexstr):
    """Convert hex to rgb list"""
    if hexstr[0] == "#":
        hexstr = hexstr.lstrip("#")
    return list(int(hexstr[i:i+2], 16) for i in (0, 2, 4))

def fetch(url):
    headers = {'Content-Type': 'text/html',}
    response = requests.get(url, headers=headers)
    return response.text

def nearest_color(subjects, query):
    return min( subjects, key = lambda subject: sum( (s - q) ** 2 for s, q in zip( subject, query ) ) )


def str_to_tree(response):
    """Take xml string return tree object"""
    htmlparser = etree.HTMLParser()
    fileobj = BytesIO(str.encode(response))
    return etree.parse(fileobj, htmlparser)

def main():
    html = fetch(URL)
    tree = str_to_tree(html)
    root = tree.getroot()
    colors = []
    for label in root.findall(".//label"):
        color = hexstr_to_list(label.attrib["data-hex"])
        color.append(label.attrib["data-title"])
        colors.append(color)
    for c64color in commodore64:
        print(nearest_color(colors, hexstr_to_list(c64color)))
if __name__ == "__main__":
    main()

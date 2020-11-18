import json
import argparse

commodore64 = ["#000000", "#FFFFFF", "#68372B", "#70A4B2",
               "#6F3D86", "#588D43", "#352879", "#B8C76F",
               "#6F4F25", "#433900", "#9A6759", "#444444", 
               "#6C6C6C", "#9AD284", "#6C5EB5", "#959595"]

def list_to_hexstr(rgb):
    """Convert rgb list to hex str"""
    r, g, b, name = rgb
    return "#{}{}{}".format(format(r, '02X'),
                            format(g, '02X'),
                            format(b, '02X'))
def hexstr_to_list(hexstr):
    """Convert hex to rgb list"""
    if hexstr[0] == "#":
        hexstr = hexstr.lstrip("#")
    return list(int(hexstr[i:i+2], 16) for i in (0, 2, 4))

def nearest_color(subjects, query):
    return min( subjects, key = lambda subject: sum( (s - q) ** 2 for s, q in zip( subject, query ) ) )

def montanablack(target_color):
    with open("blk.json", "r") as blk:
        colors = json.loads(blk.read())
    return nearest_color(colors, hexstr_to_list(target_color))

def mtn94(target_color):
    with open("mtn.json", "r") as mtn:
        colors = json.loads(mtn.read())
    return nearest_color(colors, hexstr_to_list(target_color))


if __name__ == "__main__":
    for color in commodore64:
        print("Original: {}".format(color))
        blk = montanablack(color)
        print("Blk Result: {}\tName:{}".format(list_to_hexstr(blk), blk[3]))
        mtn = mtn94(color)
        print("Mtn Result: {}\tName:{}".format(list_to_hexstr(mtn), mtn[3]))

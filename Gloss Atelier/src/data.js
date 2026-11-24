// Swap in the studio's real WhatsApp number (country code, no + or spaces)
export const WHATSAPP = '2348000000000'
export const money = (n) => '₦' + n.toLocaleString('en-NG')

// colours the hero hand cycles through
export const palette = ['#F4A6C0','#FF4F9A','#B9A3FF','#9EE6CF','#FFE08A','#C0182E','#D9A48B','#FFFFFF']

// set builder options: [label, price add-on]
export const types = [['Acrylic',25000],['Gel-X',25000],['Polygel',20000],['BIAB',25000]]
export const shapes = ['Almond','Coffin','Square','Oval','Stiletto']
export const lengths = [['Short',0],['Medium',5000],['Long',10000]]
export const finishes = [['Glossy',0],['Matte',0],['Cat-eye',5000],['Chrome',15000]]
export const arts = [['None',0],['French tips',10000],['Simple art',10000],['Full art',25000]]
// [colour name, hex]
export const colours = [['Blush','#F4A6C0'],['Hot pink','#FF4F9A'],['Lilac','#B9A3FF'],['Mint','#9EE6CF'],['Butter','#FFE08A'],['Cherry','#C0182E'],['Nude','#D9A48B'],['Midnight','#2A2A4A']]

// price list: [card title, [[service, price], ...]]
export const priceList = [['Extensions',[['Acrylic full set','From ₦25,000'],['Acrylic overlay','₦20,000'],['Gel-X full set','From ₦25,000'],['Polygel + tips','₦20,000'],['Builder gel / BIAB','From ₦25,000'],['Medium / long length','+₦5,000 / +₦10,000']]],
['Natural nails & toes',[['Classic manicure','₦10,000'],['Gel manicure','₦15,000'],['Classic pedicure','₦12,000'],['Gel pedicure','₦17,000'],['Mani & pedi combo','From ₦35,000'],['Toe acrylic + extensions','₦15,500']]],
['Art add-ons',[['Nail art (per nail)','₦2,500'],['3D design (per nail)','₦2,500'],['Stones / charms (per nail)','From ₦1,000'],['French tips','From ₦10,000'],['Chrome full set','₦15,500'],['Cat-eye polish','From ₦3,000']]],
['Maintenance',[['Refill','From ₦16,000'],['Soak-off / take-out','₦5,000'],['Nail repair (per nail)','₦2,500'],['Stick-on set','From ₦8,000'],['Manicure for men','₦10,000']]]]

// gallery: [label, shape, length, finish, art, colour, background]
export const looks = [['Pink chrome','almond','long','chrome','none','#F4A6C0','#FFD9E8'],['French','coffin','medium','glossy','french','#FF4F9A','#E9E0FF'],['Cat-eye','stiletto','long','cateye','simple','#B9A3FF','#D8F5EC'],['Mint matte','square','short','matte','none','#9EE6CF','#FFF0C2'],['Cherry gloss','oval','medium','glossy','none','#C0182E','#FFE0E8'],['Full art','coffin','long','glossy','full','#FFE08A','#E3D9FF'],['Nude chrome','almond','medium','chrome','none','#D9A48B','#FDEBDD'],['Midnight','coffin','long','glossy','simple','#2A2A4A','#D6E4FF']]

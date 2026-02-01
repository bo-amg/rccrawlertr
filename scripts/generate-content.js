// Otomatik icerik uretme scripti
// Bu script, her 3 gunde bir yeni RC Crawler icerigi uretir

const fs = require('fs');
const path = require('path');

// Icerik kategorileri ve konulari
const contentIdeas = {
  incelemeler: [
    {
      title: "Axial SCX10 III Jeep Wrangler Inceleme",
      description: "Portal aks ve iki kademeli sanziman ile gelen yeni nesil SCX10. Detayli teknik analiz.",
      tags: ["axial", "scx10", "jeep", "wrangler", "inceleme"],
      keywords: "axial scx10 iii, jeep wrangler rc, portal aks"
    },
    {
      title: "Traxxas TRX-4 Sport Inceleme",
      description: "Govdesiz ve daha uygun fiyatli TRX-4 versiyonu. Performans/fiyat analizi.",
      tags: ["traxxas", "trx-4", "sport", "inceleme"],
      keywords: "traxxas trx-4 sport, govdesiz crawler, ekonomik rc"
    },
    {
      title: "Redcat Gen8 Scout II Inceleme",
      description: "Ucuz segmentte profesyonel ozellikler. Redcat'in yeni jenerasyon crawler'i.",
      tags: ["redcat", "gen8", "scout", "inceleme"],
      keywords: "redcat gen8, scout ii, uygun fiyatli crawler"
    },
    {
      title: "Element RC Enduro Sendero Inceleme",
      description: "Element RC'nin populer modeli. Stealth X gearbox ve detayli inceleme.",
      tags: ["element", "enduro", "sendero", "inceleme"],
      keywords: "element rc enduro, sendero, stealth x"
    },
    {
      title: "Vanquish VS4-10 Phoenix Inceleme",
      description: "Yuksek performansli竞赛级 crawler. Karbon fiber ve aliminyum yapisi.",
      tags: ["vanquish", "vs4-10", "phoenix", "inceleme", "premium"],
      keywords: "vanquish vs4-10, phoenix crawler, yarismalik rc"
    },
    {
      title: "Traxxas TRX-4 Bronco Inceleme",
      description: "Ford Bronco govdesi ile gelen TRX-4 versiyonu. Klasik off-road gorunumu.",
      tags: ["traxxas", "trx-4", "bronco", "ford", "inceleme"],
      keywords: "traxxas trx-4 bronco, ford bronco rc, klasik offroad"
    },
    {
      title: "Axial SCX24 Jeep Wrangler Inceleme",
      description: "1/24 olcekli mini crawler. Ic mekan kullanimi icin ideal.",
      tags: ["axial", "scx24", "jeep", "mini", "inceleme"],
      keywords: "axial scx24, mini crawler, 124 olcek rc"
    },
    {
      title: "Kyosho Mini-Z 4x4 Jeep Wrangler Inceleme",
      description: "Japon teknolojisi ile uretilmis detayli mini crawler.",
      tags: ["kyosho", "mini-z", "jeep", "mini", "inceleme"],
      keywords: "kyosho mini-z, 4x4 mini crawler, japon rc"
    },
    {
      title: "FMS FCX24 Power Wagon Inceleme",
      description: "Retro gorunumlu mini crawler. Detayli govde ve led aydinlatma.",
      tags: ["fms", "fcx24", "power-wagon", "mini", "inceleme"],
      keywords: "fms fcx24, power wagon, retro crawler"
    },
    {
      title: "Traxxas TRX-6 Mercedes G63 AMG 6x6 Inceleme",
      description: "6 tekerlekli dev. TRX-6'nin teknik detaylari ve performansi.",
      tags: ["traxxas", "trx-6", "mercedes", "g63", "6x6", "inceleme"],
      keywords: "traxxas trx-6, mercedes g63 amg 6x6, 6x6 rc"
    },
    {
      title: "Redcat Everest Gen7 Pro Inceleme",
      description: "Ucuz segmentte profesyonel ozellikler. Everest serisinin amiral gemisi.",
      tags: ["redcat", "everest", "gen7", "pro", "inceleme"],
      keywords: "redcat everest gen7, pro model, uygun fiyatli crawler"
    },
    {
      title: "GMade GS01 Komodo Inceleme",
      description: "Kore teknolojisi ile uretilmis dayanikli ve gercekci crawler.",
      tags: ["gmade", "gs01", "komodo", "inceleme"],
      keywords: "gmade gs01, komodo crawler, kore rc"
    },
    {
      title: "HPI Venture FJ Cruiser Inceleme",
      description: "Toyota FJ Cruiser govdesi ile gelen yeni nesil crawler.",
      tags: ["hpi", "venture", "fj-cruiser", "toyota", "inceleme"],
      keywords: "hpi venture, fj cruiser, toyota rc crawler"
    },
    {
      title: "Losi Night Crawler SE Inceleme",
      description: "Yarismalik performans arayanlar icin yuksek kaliteli crawler.",
      tags: ["losi", "night-crawler", "se", "yarisma", "inceleme"],
      keywords: "losi night crawler, yarisma crawler, performans"
    },
    {
      title: "Tamiya CC-02 Mercedes G500 Inceleme",
      description: "Klasik Tamiya kalitesi ile modern crawler teknolojisinin birlesimi.",
      tags: ["tamiya", "cc-02", "mercedes", "g500", "inceleme"],
      keywords: "tamiya cc-02, mercedes g500, klasik crawler"
    }
  ],
  
  rehberler: [
    {
      title: "RC Crawler Batarya Secme Rehberi",
      description: "2S mi 3S mi? LiPo mu NiMH mi? Dogru batarya secimi icin kapsamli rehber.",
      tags: ["rehber", "batarya", "lipo", "nimh", "guc"],
      keywords: "rc crawler batarya, lipo pil, 2s 3s farki"
    },
    {
      title: "RC Crawler Temizlik ve Bakim Rehberi",
      description: "Her kullanim sonrasi yapmaniz gereken temizlik adimlari ve periyodik bakim kontrol listesi.",
      tags: ["rehber", "bakim", "temizlik", "onemli"],
      keywords: "rc crawler bakim, temizlik rehberi, servis"
    },
    {
      title: "Yeni Baslayanlar Icin RC Crawler Rehberi",
      description: "Ilk RC crawler satin almadan once bilmeniz gerekenler. Bütce planlamasi ve model secimi.",
      tags: ["rehber", "baslangic", "yeni", "tavsiye"],
      keywords: "rc crawler baslangic, ilk model, yeni baslayanlar"
    },
    {
      title: "RC Crawler Modifiye: Upgrade Siralamasi",
      description: "Hangi parcalari once upgrade etmelisiniz? Islevselden estetige dogru yol haritasi.",
      tags: ["rehber", "modifiye", "upgrade", "parca"],
      keywords: "rc crawler modifiye, upgrade, tuning"
    },
    {
      title: "RC Crawler Lastik Secimi ve Bakimi",
      description: "Farkli zeminler icin dogru lastik secimi. Lastik bakimi ve omrunu uzatma ipuclari.",
      tags: ["rehber", "lastik", "bakim", "zemin"],
      keywords: "rc crawler lastik, lastik secimi, zemin tipi"
    },
    {
      title: "RC Crawler Fircasiz Motor Rehberi",
      description: "Kv degeri nedir? Hangi motor sizin icin uygun? Fircasiz motor secimi.",
      tags: ["rehber", "motor", "fircasiz", "elektronik"],
      keywords: "rc crawler motor, fircasiz motor, kv degeri"
    },
    {
      title: "RC Crawler Vites Kutusu Bakimi",
      description: "Iki kademeli sanziman bakimi. Yag degisimi ve disli ayarlari.",
      tags: ["rehber", "sanziman", "vites", "bakim"],
      keywords: "rc crawler sanziman, vites kutusu, bakim"
    },
    {
      title: "RC Crawler Diferansiyel Ayarlari",
      description: "Kilitli diferansiyel nasil calisir? Zorlu arazi icin ayar onerileri.",
      tags: ["rehber", "diferansiyel", "kilitli", "ayar"],
      keywords: "rc crawler diferansiyel, kilitli diff, arazi ayari"
    },
    {
      title: "RC Crawler Gorev Sasi Hazirlama",
      description: "Scale gorunumlu crawler icin govde secimi ve detaylandirma.",
      tags: ["rehber", "govde", "scale", "gorev"],
      keywords: "rc crawler govde, scale gorunum, sasi hazirlama"
    },
    {
      title: "RC Crawler Kaya Tirmanisi Teknikleri",
      description: "Zorlu kayalik arazide ilerleme teknikleri. Dengenizi koruyun.",
      tags: ["rehber", "kaya", "tirmanis", "teknik"],
      keywords: "rc crawler kaya tirmanis, tirmanis teknik, arazi"
    },
    {
      title: "RC Crawler LED Aydinlatma Kurulumu",
      description: "Gercekci gorunum icin far, stop ve icki aydinlatma sistemi kurulumu.",
      tags: ["rehber", "led", "aydinlatma", "elektronik"],
      keywords: "rc crawler led, far kurulumu, aydinlatma sistemi"
    },
    {
      title: "RC Crawler Su Gecirmezlik Rehberi",
      description: "Elektronik komponentleri koruma yontemleri. Ipli su gecirmezlik.",
      tags: ["rehber", "su", "gecirmezlik", "koruma"],
      keywords: "rc crawler su gecirmezlik, elektronik koruma, ip67"
    }
  ],
  
  karsilastirmalar: [
    {
      title: "TRX-4 vs SCX10 III: Hangisi Daha Iyi?",
      description: "Iki dev karsilasiyor. Teknik ozellikler, fiyat-performans ve kullanim deneyimi karsilastirmasi.",
      tags: ["karsilastirma", "traxxas", "axial", "trx-4", "scx10"],
      keywords: "trx4 vs scx10, traxxas axial karsilastirma"
    },
    {
      title: "2S vs 3S: Hangi Bataryayi Secmelisiniz?",
      description: "Hiz mi tork mu? 2S ve 3S LiPo bataryalarin karsilastirmali analizi.",
      tags: ["karsilastirma", "batarya", "2s", "3s", "lipo"],
      keywords: "2s vs 3s, lipo karsilastirma, rc batarya"
    },
    {
      title: "540 vs 550 Motor: RC Crawler Icin Hangisi?",
      description: "Motor boyutlarinin performansa etkisi. Hangi tur kullanim icin hangisi ideal?",
      tags: ["karsilastirma", "motor", "540", "550", "elektronik"],
      keywords: "540 vs 550 motor, rc motor secimi, crawler motor"
    },
    {
      title: "Kilitli Diferansiyel vs Normal: Farklar ve Avantajlar",
      description: "Zorlu arazi sartlarinda hangisi daha iyi performans gosteriyor?",
      tags: ["karsilastirma", "diferansiyel", "kilitli", "performans"],
      keywords: "kilitli diferansiyel, normal diff, arazi performans"
    },
    {
      title: "SCX24 vs FCX24: Mini Crawler Karsilastirmasi",
      description: "1/24 olcekli mini crawler'lar karsilasiyor. Hangisi daha iyi?",
      tags: ["karsilastirma", "mini", "scx24", "fcx24", "124"],
      keywords: "scx24 vs fcx24, mini crawler karsilastirma, 124 olcek"
    },
    {
      title: "Traxxas vs Axial: Marka Karsilastirmasi",
      description: "Iki dev markanin avantajlari ve dezavantajlari. Hangisi sizin icin uygun?",
      tags: ["karsilastirma", "traxxas", "axial", "marka"],
      keywords: "traxxas vs axial, marka karsilastirma, rc markalari"
    },
    {
      title: "LiPo vs NiMH: Batarya Karsilastirmasi",
      description: "Hangi batarya teknolojisi daha uygun? Guvenlik, performans ve fiyat acisindan.",
      tags: ["karsilastirma", "batarya", "lipo", "nimh"],
      keywords: "lipo vs nimh, batarya teknolojisi, rc guc"
    },
    {
      title: "TRX-4 vs TRX-6: Hangisini Almalisiniz?",
      description: "4 tekerlek mi 6 tekerlek mi? Ihtiyaclariniza gore dogru secim.",
      tags: ["karsilastirma", "traxxas", "trx-4", "trx-6", "6x6"],
      keywords: "trx-4 vs trx-6, traxxas karsilastirma, 4x4 vs 6x6"
    },
    {
      title: "Analog vs Digital Servo: RC Crawler Icin Hangisi?",
      description: "Direksiyon tepkisi ve guc acisindan servo karsilastirmasi.",
      tags: ["karsilastirma", "servo", "analog", "digital"],
      keywords: "analog vs digital servo, rc servo, direksiyon"
    },
    {
      title: "1/10 vs 1/24 Olcek: Hangisi Size Uygun?",
      description: "Buyuk crawler mi mini crawler mi? Kullanim alanlarina gore karsilastirma.",
      tags: ["karsilastirma", "olcek", "110", "124", "mini"],
      keywords: "110 vs 124 olcek, buyuk vs mini crawler, olcek karsilastirma"
    },
    {
      title: "Portal Aks vs Normal Aks: Performans Farki",
      description: "Yuksek yerden aciklik ve tork avantajlari. Hangisi daha iyi?",
      tags: ["karsilastirma", "portal", "aks", "performans"],
      keywords: "portal aks vs normal, yuksek aciklik, tork"
    },
    {
      title: "Redcat vs Element RC: Ekonomik Marka Karsilastirmasi",
      description: "Ucuz segmentte iki populer markanin detayli karsilastirmasi.",
      tags: ["karsilastirma", "redcat", "element", "ekonomik"],
      keywords: "redcat vs element rc, ekonomik marka, ucuz crawler"
    }
  ],
  
  tavsiyeler: [
    {
      title: "2024'un En Iyi RC Crawler Modelleri",
      description: "Bütce kategorilerine gore en iyi RC crawler modelleri. 2000TL'den 20000TL'ye.",
      tags: ["tavsiye", "2024", "en iyi", "liste"],
      keywords: "en iyi rc crawler 2024, tavsiye, liste"
    },
    {
      title: "5000TL Altinda Alinabilecek En Iyi RC Crawler'lar",
      description: "Ekonomik bütceyle baslangic yapmak isteyenler icin en iyi modeller ve nedenleri.",
      tags: ["tavsiye", "ekonomik", "5000tl", "baslangic"],
      keywords: "ucuz rc crawler, 5000tl alti, ekonomik model"
    },
    {
      title: "Kaya Tirmanisi Icin En Iyi Lastikler",
      description: "Farkli zeminler icin en uygun RC crawler lastikleri. Marka ve model tavsiyeleri.",
      tags: ["tavsiye", "lastik", "kaya", "tirmanis", "yedek parca"],
      keywords: "rc crawler lastik, kaya tirmanis, en iyi lastik"
    },
    {
      title: "Premium Segment RC Crawler Tavsiyeleri",
      description: "10000TL uzeri bütce ile alinabilecek en iyi profesyonel modeller.",
      tags: ["tavsiye", "premium", "profesyonel", "yuksek bütce"],
      keywords: "premium rc crawler, profesyonel model, yuksek bütce"
    },
    {
      title: "Cocuklar Icin En Iyi RC Crawler Modelleri",
      description: "Güvenli ve dayanikli. Cocuklar icin uygun baslangic modelleri.",
      tags: ["tavsiye", "cocuk", "baslangic", "guvenli"],
      keywords: "cocuk rc crawler, baslangic model, guvenli"
    },
    {
      title: "Yarismalik RC Crawler Tavsiyeleri",
      description: "Competition seviyesinde yarismalar icin en iyi modeller ve upgrade onerileri.",
      tags: ["tavsiye", "yarisma", "competition", "performans"],
      keywords: "yarisma rc crawler, competition, performans model"
    },
    {
      title: "Scale Gorunumlu RC Crawler Tavsiyeleri",
      description: "Gercekci gorunum sevenler icin en detayli scale modeller.",
      tags: ["tavsiye", "scale", "gercekci", "detay"],
      keywords: "scale rc crawler, gercekci gorunum, detayli model"
    },
    {
      title: "Ikinci El RC Crawler Alma Tavsiyeleri",
      description: "Sahibinden alirken nelere dikkat etmeli? Kontrol listesi ve pazarlik ipuclari.",
      tags: ["tavsiye", "ikinci el", "sahibinden", "alim"],
      keywords: "ikinci el rc crawler, sahibinden, alim tavsiye"
    },
    {
      title: "Kis Aylari Icin RC Crawler Onerileri",
      description: "Soguk hava ve islak zeminler icin uygun modeller ve bakim ipuclari.",
      tags: ["tavsiye", "kis", "soguk", "islak zemin"],
      keywords: "kis rc crawler, soguk hava, islak zemin"
    },
    {
      title: "Ic Mekan Icin Mini RC Crawler Tavsiyeleri",
      description: "Evde kullanim icin ideal 1/24 olcekli mini crawler modelleri.",
      tags: ["tavsiye", "mini", "ic mekan", "ev"],
      keywords: "mini rc crawler, ic mekan, ev kullanim, 124 olcek"
    },
    {
      title: "RC Crawler Icin En Iyi Kamera Sistemleri",
      description: "FPV surus icin aksiyon kamera ve verici tavsiyeleri.",
      tags: ["tavsiye", "kamera", "fpv", "sistem"],
      keywords: "rc crawler kamera, fpv surus, aksiyon kamera"
    },
    {
      title: "RC Crawler Icin En Iyi Yan Ekipmanlar",
      description: "Kanca, halat, kurtarma krikosu gibi scale ekipman tavsiyeleri.",
      tags: ["tavsiye", "ekipman", "scale", "aksesuar"],
      keywords: "rc crawler ekipman, scale aksesuar, kanca halat"
    }
  ]
};

// Icerik template'leri
const templates = {
  incelemeler: (data) => `---
title: "${data.title}"
description: "${data.description}"
date: ${new Date().toISOString().split('T')[0]}
author: "RC Crawler TR"
tags: [${data.tags.map(t => `"${t}"`).join(', ')}]
keywords: "${data.keywords}"
layout: layouts/post.njk
---

${data.title} ile karsinizdayiz. Bu detayli incelemede modelin tum teknik ozelliklerini, kullanim deneyimini ve performansini ele alacagiz.

## Genel Bakis

${data.description}

## Teknik Ozellikler

- **Olecek:** 1/10
- **Aks mesafesi:** ~324mm
- **Sanziman:** Iki kademeli
- **Diferansiyel:** Kilitli (uzaktan kontrol)

## Kutu Icerigi

- Montaji tamamlanmis sasi
- Boyanmis govde
- 2.4GHz uzaktan kumanda
- Servo ve elektronik sistemler
- Kullanici kilavuzu

## Kullanim Deneyimi

Modeli test ettigimiz sure boyunca cesitli arazi sartlarinda performansini degerlendirdik.

### Avantajlari

- Dayanikli yapı
- Gercekci detaylar
- Kolay upgrade imkanlari

### Dezavantajlari

- Fiyat segmenti yuksek
- Yedek parca bulunabilirligi

## Sonuc

Genel degerlendirmemize gore bu model, hedef kitlesi icin basarili bir secim.

**Puan:** ⭐⭐⭐⭐☆ (4/5)

---

*Bu inceleme, kullanici deneyimlerine dayanarak hazirlanmistir.*
`,

  rehberler: (data) => `---
title: "${data.title}"
description: "${data.description}"
date: ${new Date().toISOString().split('T')[0]}
author: "RC Crawler TR"
tags: [${data.tags.map(t => `"${t}"`).join(', ')}]
keywords: "${data.keywords}"
layout: layouts/post.njk
---

${data.description}

## Giris

RC crawler dunyasinda dogru secimler yapmak, hem performans hem de maliyet acisindan kritik oneme sahiptir. Bu rehberde, konuyu bastan sona ele aliyoruz.

## Temel Kavramlar

Baslamadan once bilmeniz gereken temel terimler:

- **Olecek:** Modelin gercek araca orani (1/10, 1/8 vb.)
- **Aks mesafesi:** On ve arka akslar arasi mesafe
- **Sanziman:** Vites sistemi

## Adim Adim Rehber

### 1. Adim: Ihtiyac Analizi

Once kullanim amacinizi belirleyin:
- Sadece evde/havluda kullanim
- Dis mekan/arazi kullanimi
- Kaya tirmanisi

### 2. Adim: Bütce Belirleme

Baslangic icin onerilen bütce araliklari:
- **Ekonomik:** 3000-6000 TL
- **Orta seviye:** 6000-12000 TL
- **Premium:** 12000 TL+

### 3. Adim: Model Secimi

Bütce ve kullanim amaciniza gore uygun modellere goz atin.

## Sonuc

Dogru secimlerle RC crawler hobisinden maksimum keyif alabilirsiniz. Sorulariniz icin yorumlardan bize ulasabilirsiniz.

---

*Bu rehber, guncel bilgilere dayanarak hazirlanmistir.*
`,

  karsilastirmalar: (data) => `---
title: "${data.title}"
description: "${data.description}"
date: ${new Date().toISOString().split('T')[0]}
author: "RC Crawler TR"
tags: [${data.tags.map(t => `"${t}"`).join(', ')}]
keywords: "${data.keywords}"
layout: layouts/post.njk
---

${data.description}

## Modeller Hakkında

Karsilastirmamizda ele alacagimiz modeller, piyasadaki en populer secenekler arasindan secildi.

## Teknik Ozellikler Karsilastirmasi

| Ozellik | Model A | Model B |
|---------|---------|---------|
| Olecek | 1/10 | 1/10 |
| Aks mesafesi | 324mm | 312mm |
| Agirlik | 2.4kg | 2.1kg |
| Fiyat | Premium | Orta |

## Performans Karsilastirmasi

### Kaya Tirmanisi

Her iki model de zorlu kaya sartlarinda basarili performans gosteriyor.

### Arazi Kullanimi

Taslik ve engebeli arazideki davranislari degerlendirdik.

### Hiz ve Tork

Motor ve elektronik sistemlerin karsilastirmali analizi.

## Fiyat-Performans Analizi

Hangi model, hangi bütce icin daha uygun?

## Sonuc

Seciminiz, kullanim amaciniza ve bütçenize bagli olarak degisecektir.

---

*Karsilastirma, guncel piyasa verilerine dayanmaktadir.*
`,

  tavsiyeler: (data) => `---
title: "${data.title}"
description: "${data.description}"
date: ${new Date().toISOString().split('T')[0]}
author: "RC Crawler TR"
tags: [${data.tags.map(t => `"${t}"`).join(', ')}]
keywords: "${data.keywords}"
layout: layouts/post.njk
---

${data.description}

## Secim Kriterleri

Tavsiyelerimizi belirlerken su kriterleri goz onunde bulundurduk:

- Fiyat-performans orani
- Parca bulunabilirligi
- Upgrade imkanlari
- Kullanici yorumlari

## Tavsiye Listesi

### 1. Traxxas TRX-4 Land Rover Defender

**Bütce:** Premium (12000 TL+)

En kapsamli ozellik setine sahip, gercekci govde ve ileri duzey elektronikler.

### 2. Axial SCX10 III Jeep Wrangler

**Bütce:** Orta-Ust (9000-12000 TL)

Portal aks sistemi ve guclu topluluk destegi ile one cikan model.

### 3. Redcat Gen8 Scout II

**Bütce:** Orta (6000-9000 TL)

Ucuz segmentte profesyonel ozellikler sunan basarili model.

### 4. Element RC Enduro

**Bütce:** Ekonomik-Orta (5000-7000 TL)

Baslangic icin ideal, upgrade edilebilir yapi.

## Sonuc

Listemizdeki modeller, farkli bütce ve ihtiyaclara hitap ediyor. Seciminizi yapmadan once kullanim amacinizi netlestirmenizi oneririz.

---

*Tavsiyeler, guncel piyasa kosullarina gore duzenli olarak guncellenmektedir.*
`
};

// Hangi kategoride icerik uretilecegini belirle
function getNextCategory() {
  const categories = Object.keys(contentIdeas);
  
  // Son uretilen kategoriyi kontrol et
  const lastCategoryFile = path.join(__dirname, '..', '.last-category');
  let lastIndex = -1;
  
  if (fs.existsSync(lastCategoryFile)) {
    const lastCategory = fs.readFileSync(lastCategoryFile, 'utf8').trim();
    lastIndex = categories.indexOf(lastCategory);
  }
  
  // Siradaki kategori
  const nextIndex = (lastIndex + 1) % categories.length;
  const nextCategory = categories[nextIndex];
  
  // Kaydet
  fs.writeFileSync(lastCategoryFile, nextCategory);
  
  return nextCategory;
}

// Kullanilmamis bir icerik konusu sec
function getUnusedContent(category) {
  const categoryPath = path.join(__dirname, '..', 'src', category);
  
  // Mevcut dosyalari al
  let existingFiles = [];
  if (fs.existsSync(categoryPath)) {
    existingFiles = fs.readdirSync(categoryPath)
      .filter(f => f.endsWith('.md'))
      .map(f => f.replace('.md', ''));
  }
  
  // Kullanilmamis konulari bul
  const available = contentIdeas[category].filter(item => {
    const slug = item.title.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
    return !existingFiles.some(f => f.includes(slug));
  });
  
  if (available.length === 0) return null;
  
  // Rastgele sec
  return available[Math.floor(Math.random() * available.length)];
}

// Ana fonksiyon
function generateContent() {
  console.log('🚀 Otomatik icerik uretimi basliyor...\n');
  
  const category = getNextCategory();
  console.log(`📁 Kategori: ${category}`);
  
  const content = getUnusedContent(category);
  
  if (!content) {
    console.log(`⚠️  ${category} kategorisinde yeni icerik kalmamis.`);
    return;
  }
  
  // Dosya adi olustur
  const slug = content.title.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
  
  const fileName = `${slug}.md`;
  const filePath = path.join(__dirname, '..', 'src', category, fileName);
  
  // Template'i kullanarak icerik olustur
  const template = templates[category];
  const fileContent = template(content);
  
  // Dosyayi kaydet
  fs.writeFileSync(filePath, fileContent);
  
  console.log(`✅ Yeni icerik olusturuldu: src/${category}/${fileName}`);
  console.log(`📝 Baslik: ${content.title}`);
  console.log(`🏷️  Etiketler: ${content.tags.join(', ')}`);
  
  return filePath;
}

// Calistir
try {
  const result = generateContent();
  if (result) {
    process.exit(0);
  } else {
    process.exit(0); // Icerik kalmamis ama hata degil
  }
} catch (error) {
  console.error('❌ Hata:', error.message);
  process.exit(1);
}

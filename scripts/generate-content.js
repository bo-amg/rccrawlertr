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

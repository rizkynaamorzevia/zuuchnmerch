// ===== Pengaturan (ubah di sini) =====
const CONFIG = {
  pemilik: "Rizky",
  email: "email@example.com",          // GANTI dengan email aslimu
  youtubeID: "jNQXAC9IVRw",            // GANTI: kode di link youtube.com/watch?v=KODE
  wa: "6282184684045",
  website: "https://rizkynaamorzevia.github.io/zuuchnmerch/",
  shopee: "https://shopee.co.id/zukaashopp",
  ig: "https://instagram.com/zuuchn_"
};

const artikel = [
  {file:"artikel1.html", judul:"Cara Merawat Figure Anime Agar Awet", ringkas:"Figure kesayanganmu bisa awet bertahun-tahun kalau dirawat dengan benar. Yuk simak tips sederhananya."},
  {file:"artikel2.html", judul:"Tips Memilih Costume Cosplay yang Pas", ringkas:"Salah ukuran itu bikin kecewa. Ini cara memilih costume supaya pas dan nyaman dipakai."},
  {file:"artikel3.html", judul:"Mengenal Merchandise Genshin Impact dan Strinova", ringkas:"Dari figure sampai keychain, kenali jenis merchandise game favorit yang tersedia di toko kami."}
];
const kartuArtikel = () => artikel.map(a => `
  <div class="kartu">
    <h3><a href="${a.file}">${a.judul}</a></h3>
    <p>${a.ringkas}</p>
    <a class="btn" href="${a.file}">Read More</a>
  </div>`).join("");

// ===== 1. Menu + dropdown =====
const aktif = (...f) => f.some(x => halaman.startsWith(x)) ? "aktif" : "";
document.querySelector(".menu").innerHTML = `
  <a href="index.html" class="${aktif("index")}">Home</a>
  <div class="dd">
    <a href="products.html" class="${aktif("products","collection")}">Products ▾</a>
    <div class="dd-isi">
      <a href="products.html">Semua Produk</a>
      <a href="collection.html?kat=Figure">Figure</a>
      <a href="collection.html?kat=Costume">Costume</a>
      <a href="collection.html?kat=Poster">Poster</a>
      <a href="collection.html?kat=Aksesoris">Aksesoris</a>
    </div>
  </div>
  <a href="artikel.html" class="${aktif("artikel")}">Artikel</a>
  <a href="gallery.html" class="${aktif("gallery")}">Gallery</a>
  <div class="dd">
    <a href="about.html" class="${aktif("about")}">About Us ▾</a>
    <div class="dd-isi">
      <a href="about.html">Profil</a>
      <a href="about.html#sejarah">Sejarah</a>
      <a href="about.html#visi">Visi &amp; Misi</a>
      <a href="about.html#struktur">Struktur</a>
    </div>
  </div>
  <a href="registration.html" class="${aktif("registration")}">Registration</a>
  <a href="contact.html" class="${aktif("contact")}">Contact</a>`;

// ===== 2. Teks berjalan =====
document.querySelector("header").insertAdjacentHTML("afterend",
  `<div class="marquee"><span>✨ Selamat datang di ZuuChnMerch ✨ Your Favorite Anime &amp; Gaming Merchandise Store ✨ Pesan lewat WhatsApp atau Shopee ✨</span></div>`);

// ===== 3. Footer =====
document.querySelector("footer").insertAdjacentHTML("beforeend", `
  <br>Desain by ${CONFIG.pemilik} · Website resmi: <a href="${CONFIG.website}">${CONFIG.website.replace("https://","")}</a> · <a href="${CONFIG.shopee}" target="_blank">Shopee</a>`);

// ===== 4. Home: sidebar, artikel, pengumuman =====
if (halaman == "index.html") {
  const main = document.querySelector("main");
  const konten = document.createElement("div");
  konten.className = "konten";
  while (main.firstChild) konten.appendChild(main.firstChild);
  main.appendChild(konten);
  main.classList.add("dengan-sidebar");

  konten.insertAdjacentHTML("beforeend", `
    <section><h2>📢 Pengumuman</h2>
      <div class="pengumuman">Website ZuuChnMerch resmi meluncur! Pesanan diproses lewat WhatsApp.</div>
      <div class="pengumuman">Chat kami untuk cek stok dan ongkir sebelum memesan.</div>
    </section>
    <section><h2>Artikel Terbaru</h2><div class="grid">${kartuArtikel()}</div></section>`);

  let kunjungan = (Number(localStorage.getItem("kunjungan")) || 0) + 1;
  localStorage.setItem("kunjungan", kunjungan);

  main.insertAdjacentHTML("beforeend", `
    <aside>
      <div class="widget"><h3>🕒 Jam</h3><div id="jam"></div></div>
      <div class="widget"><h3>▶ Video</h3>
        <iframe src="https://www.youtube.com/embed/${CONFIG.youtubeID}" title="Video" allowfullscreen loading="lazy"></iframe>
      </div>
      <div class="widget"><h3>👤 Profil Pemilik</h3>
        <p><b>${CONFIG.pemilik}</b><br>Pemilik ZuuChnMerch, penggemar anime &amp; game.<br>
        <a href="${CONFIG.ig}" target="_blank" rel="noopener">@zuuchn_</a></p>
      </div>
      <div class="widget"><h3>📊 Statistik</h3><p>Jumlah kunjungan: <b>${kunjungan}</b></p></div>
    </aside>`);

  const jam = () => {
    const d = new Date();
    document.getElementById("jam").innerHTML =
      `<b>${d.toLocaleTimeString("id-ID")}</b><br><small>${d.toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</small>`;
  };
  jam(); setInterval(jam, 1000);
}

// ===== 5. Halaman Artikel =====
const daftarArtikel = document.getElementById("daftar-artikel");
if (daftarArtikel) daftarArtikel.innerHTML = kartuArtikel();

// ===== 6. Halaman Gallery =====
const galeri = document.getElementById("galeri");
if (galeri) galeri.innerHTML = produk.map(p => `
  <a href="${p.foto}" target="_blank"><img src="${p.foto}" alt="${p.nama}" title="${p.nama}" loading="lazy" onerror="this.src='zukashoplogo.png'"></a>`).join("");

// ===== 7. Halaman About: tambahan =====
if (halaman == "about.html") {
  document.querySelector("main").insertAdjacentHTML("beforeend", `
    <section id="sejarah"><h2>Sejarah</h2>
      <p>ZuuChnMerch berdiri sejak Mei 2026 dari kecintaan pada anime dan game. Kini kami hadir lewat Instagram, Shopee, dan website ini.</p></section>
    <section id="visi"><h2>Visi</h2>
      <p>Menjadi toko merchandise anime &amp; game favorit para penggemar di Indonesia.</p>
      <h2 style="margin-top:20px">Misi</h2>
      <ul style="margin-left:20px">
        <li>Menyediakan merchandise berkualitas dengan harga terjangkau.</li>
        <li>Memberikan pelayanan yang ramah dan cepat.</li>
        <li>Mengemas pesanan dengan aman sampai ke tangan pembeli.</li>
      </ul></section>
    <section><h2>Tujuan</h2>
      <p>Memudahkan penggemar anime &amp; game mendapatkan merchandise favorit mereka dalam satu tempat.</p></section>
    <section id="struktur"><h2>Struktur Organisasi</h2>
      <div class="struktur">
        <div><b>${CONFIG.pemilik}</b><br>Pemilik</div>
        <div><b>Admin</b><br>Layanan Pelanggan</div>
        <div><b>Tim Packing</b><br>Pengemasan &amp; Pengiriman</div>
      </div></section>`);
  if (location.hash) document.querySelector(location.hash)?.scrollIntoView();
}

// ===== 8. Halaman Contact: email, kolom Institusi =====
if (halaman == "contact.html") {
  const email = document.querySelector('input[name="email"]');
  if (email && !document.querySelector('input[name="institusi"]'))
    email.insertAdjacentHTML("afterend", '<input type="text" name="institusi" placeholder="Institusi (sekolah/kampus/komunitas)" required>');
  document.querySelector("main h1").insertAdjacentHTML("afterend",
    `<p>Email: <b>${CONFIG.email}</b> · <a href="${CONFIG.shopee}" target="_blank" rel="noopener">Shopee</a></p>`);
  window.kirimWA = function (e) {
    e.preventDefault();
    const f = e.target;
    const teks = `Halo ZuuChnMerch, saya ${f.nama.value} (${f.email.value}) dari ${f.institusi ? f.institusi.value : "-"}. ${f.pesan.value}`;
    window.open(`https://wa.me/${CONFIG.wa}?text=` + encodeURIComponent(teks));
  };
}

// ===== 9. Halaman Registration =====
function daftarWA(e) {
  e.preventDefault();
  const f = e.target;
  const teks = `Halo ZuuChnMerch, saya ingin daftar sebagai ${f.jenis.value}.\nNama: ${f.nama.value}\nEmail: ${f.email.value}\nNo HP: ${f.hp.value}\nKota: ${f.kota.value}`;
  window.open(`https://wa.me/${CONFIG.wa}?text=` + encodeURIComponent(teks));
}

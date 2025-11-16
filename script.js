const form = document.getElementById('verifikasiForm');
const hasilDiv = document.getElementById('hasil');

// Ganti dengan URL Railway backend Anda
const API_URL = "https://railwaybkpsdmbuton-production.up.railway.app/api/verfikasi";

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  hasilDiv.innerHTML = '<div class="error">⏳ Sedang memverifikasi...</div>';

  const nomorSurat = document.getElementById('nomorSurat').value;
  const namaPegawai = document.getElementById('namaPegawai').value;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nomorSurat, namaPegawai })
    });

    const data = await response.json();

    if (data.verified) {
      hasilDiv.innerHTML = `
        <div class="card">
          <p style="color:green;">✅ ${result.message}</p>
          <p>Nomor Surat: ${result.data.nomorSurat}</p>
          <p>Nama Pegawai: ${result.data.namaPegawai}</p>
          <p>NIP: ${result.data.nip}</p>
        </div>
      `;
    } else {
      hasilDiv.innerHTML = `
        <div class="error">❌ ${data.message}</div>
      `;
    }
  } catch (err) {
    console.error(err);
    hasilDiv.innerHTML = `
      <div class="error">⚠️ Terjadi kesalahan koneksi ke server Railway.</div>
    `;
  }
});





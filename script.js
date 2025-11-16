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
          <h3>✅ Dokumen Terverifikasi</h3>
          <p><strong>Nomor Surat:</strong> ${data.data.nomor_surat}</p>
          <p><strong>Tanggal Surat:</strong> ${data.data.tanggal_surat || '-'}</p>
          <p><strong>Perihal:</strong> ${data.data.perihal || '-'}</p>
          <hr>
          <p><strong>Nama Pegawai:</strong> ${data.data.nama_pegawai}</p>
          <p><strong>NIP:</strong> ${data.data.nip || '-'}</p>
          <p><strong>Jabatan:</strong> ${data.data.jabatan || '-'}</p>
          <p><strong>Unit Kerja:</strong> ${data.data.unit_kerja || '-'}</p>
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

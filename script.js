const API_URL = "http://localhost:8080/api/verfikasi"; // endpoint backend

// cek apakah script.js terkoneksi
console.log("script.js berhasil terkoneksi!");

document.getElementById("verifikasiForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nomorSurat = document.getElementById("nomorSurat").value.trim();
  const namaPegawai = document.getElementById("namaPegawai").value.trim();

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nomorSurat, namaPegawai })
    });

    const result = await response.json();

    const hasilDiv = document.getElementById("hasil");
    if (result.verified) {
      hasilDiv.innerHTML = `
        <p style="color:green;">✅ ${result.message}</p>
        <p>Nomor Surat: ${result.data.nomorSurat}</p>
        <p>Nama Pegawai: ${result.data.namaPegawai}</p>
        <p>NIP: ${result.data.nip}</p>
      `;
    } else {
      hasilDiv.innerHTML = `<p style="color:red;">❌ ${result.message}</p>`;
    }
  } catch (err) {
    console.error("Error:", err);
    document.getElementById("hasil").innerHTML = `<p style="color:red;">Server tidak bisa dihubungi.</p>`;
  }
});

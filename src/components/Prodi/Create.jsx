import React, {useEffect, useState} from "react";
import axios from "axios";

export default function createProdi() {
  
  const token = localStorage.getItem("authToken");

  //Inisialisasi state u/ menyimpan nama Prodi
  const [namaProdi, setNamaProdi] = useState('');
  //Inisialiasasi state u/ menyimpan id fakultas yang dipilih
  const [fakultasId, setFakultasId] = useState('');
  //Inisialisasi state u/ menyimpan list fakultas
  const [fakultasList, setFakultasList] = useState([]);
  //inisialisasi state u/ menyimpan pesan error
  const [error, setError] = useState('');
  //inisialiasi state u/ menyimpan pesan sukses
  const [success, setSuccess] = useState('');

   useEffect(() => {
        const fetchfakultas = async () => {
            try {
                const response = await axios.get(
                  "https://project-apiif-3-b.vercel.app/api/api/fakultas"
                );
                setFakultasList(response.data.result);
              } catch (e) {
                setError("Failed to fetch fakultas");
  
            }
        };
        fetchfakultas();
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (namaProdi.trim() === "" || fakultasId.trim() === "") {
      setError("Nama fakultas dan nama prodi harus diisi");
      return;
    }

    try {
      const response = await axios.post(
        "https://project-apiif-3-b.vercel.app/api/api/prodi",
        { nama: namaProdi,
            fakultas_id: fakultasId ,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        }
      );

      if (response.status === 201) {
        setSuccess("Berhasil menyimpan data Prodi");
        setNamaProdi(""); 
        setFakultasId("");
      } else {
        setError("Failed to create Prodi");
      }
    } catch (e) {
      setError("An error occurred while creating Prodi");
    }
  };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Create Prodi</h2>
            {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
            {error && <div className="alert alert-danger">{error}</div>}
            {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
            {success && <div className="alert alert-success">{success}</div>}

            {/* Form untuk mengisi nama Prodi */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="namaProdi" className="form-label">Nama Prodi</label>

                    {/* Input untuk nama Prodi dengan class bootstrap */}
                    <input
                        type="text" className="form-control" id="namaProdi"
                        value={namaProdi} // Nilai input disimpan di state namaFakultas
                        onChange={(e) => setNamaProdi(e.target.value)} // Update state saat input berubah
                        placeholder="Masukkan Nama Prodi" // Placeholder teks untuk input
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="fakultasId" className="from-label">
                        Fakultas
                    </label>
                    {/*input untuk nama fakultas dengan class bootstrap */}
                    <select name="from-select" id="fakultasId"
                    value={fakultasId}
                    onChange={(e) => setFakultasId(e.target.value)}
                >
                    <option value="">Select Fakultas</option>

                    {fakultasList.map((fakultas) => (
                        <option key={fakultas.id} value={fakultas.id}>
                                {fakultas.nama}
                        </option>

                    ))}
                    </select>

                </div>
                {/* Type Button Submit */}
                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
        </div>
    );
}
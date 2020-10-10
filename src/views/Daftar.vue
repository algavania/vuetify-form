<template>
  <div class="daftar">
    <v-container class="container">
      <v-card>
        <v-card-title class="accent font-weight-light white--text">
          Animasi
        </v-card-title>
        <v-card-text>
          <div class="form-container py-4">
            <v-form v-on:submit.prevent ref="form">
              <div
                class="form-grid"
                v-for="(field, index) in forms"
                :key="field.label"
              >
                <div
                  class="black--text text-start d-flex align-center justify-end title font-weight-regular"
                >
                  {{ `${index + 1}.` }}
                </div>

                <v-text-field
                  :label="checkRequired(field)"
                  :rules="validateRules(field)"
                  v-if="
                    !hasChild(field.label) && field.label != 'Jenis Kelamin'
                  "
                ></v-text-field>

                <div
                  v-if="hasChild(field.label)"
                  class="subtitle-1 black--text"
                >
                  {{ checkRequired(field) }}
                </div>

                <v-select
                  v-if="field.label === 'Jenis Kelamin'"
                  :items="gender"
                  :model="field.model"
                  :label="checkRequired(field)"
                  :rules="validateRules(field)"
                ></v-select>

                <div v-if="hasChild(field.label)"></div>

                <div v-if="hasChild(field.label)">
                  <v-text-field
                    class="mt-0 pt-0 ml-3"
                    v-for="child in field.childs"
                    :key="child.label"
                    :label="checkRequired(child)"
                    :rules="validateRules(child)"
                  ></v-text-field>
                </div>
              </div>
            </v-form>
          </div>

          <div>
            <v-container>
              <v-row class="text-center d-flex justify-center align-center">
                <v-col
                  cols="12"
                  lg="6"
                  md="6"
                  sm="12"
                  v-for="(item, index) in attachments"
                  :key="item.label"
                  class="black--text"
                >
                  <div>{{ checkRequired(item) }}</div>
                  <div
                    class="preview-container d-flex justify-center align-center"
                  >
                    <div class="subtitle-1 text-preview">Preview</div>
                    <img
                      class="img-preview"
                      :id="`img-preview-${index}`"
                      alt="image"
                      style="display: none"
                    />
                  </div>
                  <center class="mt-3">
                    <p
                      class="red--text"
                      :id="`img-error-${index}`"
                      style="display: none"
                    >
                      File wajib diisi
                    </p>
                    <v-btn
                      ref="button"
                      class="accent"
                      @click="uploadImage(index, item.model)"
                      >Upload</v-btn
                    >
                    <image-uploader
                      :preview="true"
                      ref="attachment"
                      v-show="false"
                      :className="[
                        'fileinput',
                        { 'fileinput--loaded': hasImage },
                      ]"
                      capture="environment"
                      :debug="0"
                      accept="image/*"
                      :autoRotate="true"
                      outputFormat="verbose"
                      @input="setImage"
                    ></image-uploader>
                  </center>
                </v-col>
              </v-row>
            </v-container>
          </div>

          <div class="subtitle-1 mt-5 ml-8 black--text">Note :</div>
          <div class="subtitle-1 black--text ml-8">* wajib diisi</div>

          <center class="pb-5">
            <v-btn class="accent" @click="submitForm">Kirim</v-btn>
          </center>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import ImageUploader from "vue-image-upload-resize";

export default {
  components: {
    ImageUploader,
  },
  data() {
    return {
      indexImage: "",
      hasImage: false,
      title: "",
      gender: [
        { value: "L", text: "Laki-laki" },
        { value: "P", text: "Perempuan" },
      ],
      forms: [
        {
          label: "Nomor Ujian Nasional SMP/MTS",
          model: "sw_no_ujian",
        },
        {
          label: "Nomor Induk Siswa Nasional (NISN)",
          model: "sw_nisn",
          required: true,
        },
        {
          label: "Nama Siswa (Lengkap)",
          model: "sw_nama_lengkap",
          required: true,
        },
        {
          label: "Jenis Kelamin",
          model: "sw_gender",
          required: true,
        },
        {
          label: "Tempat dan Tanggal Lahir",
          model: "sw_ttl",
          required: "true",
        },
        {
          label: "Agama",
          model: "sw_agama",
          required: "true",
        },
        {
          label: "Alamat Siswa (Lengkap)",
          required: true,
          childs: [
            {
              label: "Provinsi",
              model: "sw_alamat_provinsi",
              required: true,
            },
            {
              label: "Kabupaten/Kota",
              model: "sw_alamat_kota",
              required: true,
            },
            {
              label: "Kecamatan",
              model: "sw_alamat_kecamatan",
              required: true,
            },
            {
              label: "Desa RT RW",
              model: "sw_alamat_lain",
              required: true,
            },
          ],
        },
        {
          label: "Sekolah Asal",
          required: true,
          childs: [
            {
              label: "Nama",
              model: "sw_sekolah_nama",
              required: true,
            },
            {
              label: "Alamat",
              model: "sw_sekolah_alamat",
              required: true,
            },
          ],
        },
        {
          label: "Tinggi Badan (cm)",
          model: "sw_tb",
          required: true,
        },
        {
          label: "Berat Badan (kg)",
          model: "sw_bb",
          required: true,
        },
        {
          label: "Nama Orang Tua",
          required: true,
          childs: [
            {
              label: "Ayah",
              model: "ayah_nama",
              required: true,
            },
            {
              label: "Ibu",
              model: "ibu_nama",
              required: true,
            },
          ],
        },
        {
          label: "Pekerjaan Orang Tua",
          required: true,
          childs: [
            {
              label: "Ayah",
              model: "ayah_pekerjaan",
              required: true,
            },
            {
              label: "Ibu",
              model: "ibu_pekerjaan",
              required: true,
            },
          ],
        },
        {
          label: "Nomor Telepon/HP",
          required: true,
          childs: [
            {
              label: "Ayah",
              model: "ayah_no_hp",
              required: true,
            },
            {
              label: "Ibu",
              model: "ibu_no_hp",
              required: true,
            },
          ],
        },
        {
          label: "Nama Wali",
          model: "wali_nama",
        },
        {
          label: "Alamat Wali (Lengkap)",
          model: "wali_alamat",
        },
        {
          label: "Pekerjaan Wali",
          model: "wali_pekerjaan",
        },
        {
          label: "Nomor Telepon Wali",
          model: "wali_no_hp",
        },
      ],
      attachments: [
        { label: "Pas Foto Diri 3x4", model: "img_foto", required: true },
        {
          label: "Catatan Kesehatan (dari dokter/puskesmas)",
          model: "img_kesehatan",
          required: true,
        },
        { label: "Akta Kelahiran", model: "img_akte", required: true },
        { label: "Kartu Keluarga", model: "img_kk", required: true },
        {
          label: "Nilai Rapor Terakhir",
          model: "img_rapor",
          required: false,
        },
        { label: "Prestasi", model: "img_prestasi", required: false },
        {
          label: "Hasil Karya Gambar",
          model: "img_gambar_anim",
          required: true,
        },
      ],
      imageUrls: {
        img_foto: "",
        img_kesehatan: "",
        img_akte: "",
        img_kk: "",
        img_rapor: "",
        img_prestasi: "",
        img_gambar_anim: "",
      },
    };
  },
  methods: {
    validateRules(field) {
      if (field.required) {
        return [(v) => !!v || `Field ${field.label} harus diisi`];
      }
    },
    hasChild(label) {
      if (
        label === "Alamat Siswa (Lengkap)" ||
        label === "Sekolah Asal" ||
        label === "Nama Orang Tua" ||
        label === "Pekerjaan Orang Tua" ||
        label === "Nomor Telepon/HP"
      )
        return true;
      else return false;
    },
    checkRequired(field) {
      if (field.required) return `${field.label} *`;
      else return field.label;
    },
    setImage(output) {
      if (output.type === undefined) {
        var imgMime = output.info.type;

        if (imgMime === "image/jpeg" || imgMime === "image/png") {
          this.hasImage = true;
          document.getElementsByClassName("text-preview")[
            this.indexImage
          ].style.display = "none";
          document.getElementsByClassName("preview-container")[
            this.indexImage
          ].style = "min-height: auto";
          document.getElementById(
            `img-preview-${this.indexImage}`
          ).style.display = "block";
          document.getElementById(`img-preview-${this.indexImage}`).src =
            output.dataUrl;

          for (var url in this.imageUrls) {
            if (url === this.attachments[this.indexImage].model) {
              this.imageUrls[url] = output.dataUrl;
            }
          }
        } else {
          console.log("Can't upload this mime type");
        }
      }
    },
    uploadImage(index, type) {
      this.selectedImageType = type;
      this.$refs.attachment[index].$el.children[1].click();
      this.indexImage = index;
    },
    submitForm() {
      for (let i = 0; i < Object.keys(this.imageUrls).length; i++) {
        if (this.imageUrls[Object.keys(this.imageUrls)[i]] === "") {
          document.getElementById(`img-error-${i}`).style.display = "block";
        } else {
          document.getElementById(`img-error-${i}`).style.display = "none";
        }
      }
      if (!this.$refs.form.validate()) {
        let errorMessage = document.querySelector(".v-text-field__details");

        const distanceToTop = (el) =>
          Math.floor(el.getBoundingClientRect().top);

        window.scrollBy({
          top: distanceToTop(errorMessage),
          left: 0,
          behavior: "smooth",
        });
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 60% !important;
  margin: 1rem auto !important;
}

.form-container {
  width: 90%;
  margin: auto;
}

.form-grid {
  display: grid;
  grid-template-columns: 20px auto;
  grid-gap: 15px;
}

.preview-container {
  border: 1px solid #374785;
  min-height: 200px;
  max-height: 300px;
  overflow: hidden;
  width: 100%;
}

.img-preview {
  width: 100%;
  height: auto;
}

@media only screen and (max-width: 1250px) {
  .container {
    width: 90% !important;
  }
}
</style>
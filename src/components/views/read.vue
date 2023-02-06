<template>
    <div class="container mt-custom">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{ name: 'views.index' }"> <svg xmlns="http://www.w3.org/2000/svg" width="50"
                                height="50" fill="currentColor" class="bi bi-caret-left" viewBox="0 0 50 50">
                                <path
                                    d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z" />
                            </svg></router-link>
                        <h4>Data Peminjam</h4>
                        <hr>
                        <form>
                            <div class="form-group">
                                <label for="nama_lengkap" class="font-weight-bold mb-2">Nama Lengkap</label>
                                <input class="form-control" v-model="post.nama_lengkap" disable readonly>
                            </div>
                            <div class="form-group mt-3">
                                <label for="Nim" class="font-weight-bold mb-2">Nim</label>
                                <input class="form-control" v-model="post.nim" disable readonly>
                            </div>
                            <div class="form-group mt-3">
                                <label for="Nama_Barang" class="font-weight-bold mb-2">Prodi</label>
                                <input class="form-control" v-model="post.prodi" disable readonly>
                            </div>
                            <div class="form-group mt-3">
                                <label for="Nama_Barang" class="font-weight-bold mb-2">Fakultas</label>
                                <input class="form-control" v-model="post.fakultas" disabled readonly>
                            </div>
                            <div class="form-group mt-3">
                                <label for="Nama_Barang" class="font-weight-bold mb-2">Nama Barang</label>
                                <input class="form-control" v-model="post.nama_barang" disable readonly>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {

    setup() {

        //state posts
        const post = reactive({
            nama_lengkap: '',
            nim: '',
            prodi: '',
            fakultas: '',
            nama_barang: '',

        })


        //vue router
        const router = useRouter()

        //vue router
        const route = useRoute()

        //mounted
        onMounted(() => {

            //get API from Backend
            axios.get(`http://localhost:3000/api/peminjaman_barang/${route.params.id}`)
                .then(response => {

                    //assign state posts with response data
                    post.nama_lengkap = response.data.data.nama_lengkap
                    post.nim = response.data.data.nim
                    post.prodi = response.data.data.prodi
                    post.fakultas = response.data.data.fakultas
                    post.nama_barang = response.data.data.nama_barang


                }).catch(error => {
                    console.log(error.response.data)
                })

        })


        //return
        return {
            post,
            router,
        }

    }

}
</script>

<style>

</style>
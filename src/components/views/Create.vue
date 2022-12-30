<template>
    <div class="container mt-custom">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH POST</h4>
                        <hr>
                        <div v-if="validation.errors" class="mt-2 alert alert-danger">
                            <ul class="mt-0 mb-0">
                                <li v-for="(error, index) in validation.errors" :key="index">{{ `${error.param} : ${error.msg}` }}</li>
                            </ul>
                        </div>
                        <form @submit.prevent="store">
                            <div class="form-group">
                                <label for="nama_lengkap" class="font-weight-bold mb-2">Nama Lengkap</label>
                                <input class="form-control" v-model="post.nama_lengkap" placeholder="Masukkan Nama">
                            </div>
                            <div class="form-group mt-3">
                                <label for="Nim" class="font-weight-bold mb-2">Nim</label>
                                <input class="form-control" v-model="post.nim" placeholder="Masukkan Nim">
                            </div>
                            <div class="form-group mt-3">
                                <label for="Nama_Barang" class="font-weight-bold mb-2">Nama Barang</label>
                                <input class="form-control" v-model="post.nama_barang" placeholder="Masukkan Nama Barang">
                            </div>
                            <div class="form-group mt-3">
                                <label for="date">Tanggal Pinjam</label>
                                <input type="date" id="date" v-model="post.tanggal_pinjam" class="form-control" >
                            </div>
                            <div class="form-group mt-3">
                                <label for="date">Tanggal Kembali</label>
                                <input type="date" id="date" v-model="post.tanggal_kembali" class="form-control" >
                            </div>
                            <div class="form-group" style="margin-top:30px; float:right">
                                <button type="submit" class="btn btn-md btn-success" style="margin-right:10px">SIMPAN</button>
                                <button type="reset" class="btn btn-md btn-danger">RESET</button>
</div>
                        </form>                        

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {

    setup() {

        //state posts
        const post = reactive({
            nama_lengkap: '',
            nim:'',
            nama_barang: '',
            tanggal_pinjam:'',
            tanggal_kembali:'',

        })

        //state validation
        const validation = ref([])

        //vue router
        const router = useRouter()

        //method store
        function store() {

            let nama_lengkap = post.nama_lengkap
            let nim = post.nim
            let nama_barang = post.nama_barang
            let tanggal_pinjam = post.tanggal_pinjam
            let tanggal_kembali = post.tanggal_kembali


            axios.post('http://localhost:3000/api/peminjaman_barang/store', {
                nama_lengkap: nama_lengkap,
                nim: nim,
                nama_barang: nama_barang,
                tanggal_pinjam: tanggal_pinjam,
                tanggal_kembali: tanggal_kembali,
            }).then(() => {

                //redirect ke post index
                router.push({
                    name: 'views.index'
                })

            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })

        }

        //return
        return {
            post,
            validation,
            router,
            store
        }

    }

}
</script>
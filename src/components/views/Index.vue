<template>
    <div class="container mt-custom">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body bg-dark">
                        <h4>DATA POST</h4>
                        <hr>
                        <router-link :to="{ name: 'views.create' }" class="btn btn-md btn-success"
                            style="float:right; margin-bottom: 30px;">TAMBAH DATA PEMINJAMAN</router-link>

                        <table class="table table-striped table-bordered mt-4 table-dark">
                            <thead class="thead-dark">
                                <tr>
                                    <th class="text-center" scope="col">No</th>
                                    <th class="text-center" scope="col">Nama Lengkap</th>
                                    <th class="text-center" scope="col">Nim</th>
                                    <th class="text-center" scope="col">Nama Barang</th>
                                    <th class="text-center" scope="col">Tanggal Pinjam</th>
                                    <th class="text-center" scope="col">Tanggal Kembali</th>
                                    <td class="text-center"></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(post, index) in views" :key="index">
                                    <td class="text-center">{{ index + 1 }}</td>
                                    <td class="text-center">{{ post.nama_lengkap }}</td>
                                    <td class="text-center">{{ post.nim }}</td>
                                    <td class="text-center">{{ post.nama_barang }}</td>
                                    <td class="text-center">{{ post.tanggal_pinjam }}</td>
                                    <td class="text-center">{{ post.tanggal_kembali }}</td>
                                    <td class="text-center">
                                        <router-link :to="{ name: 'views.edit', params: { id: post.id } }"
                                            class="btn btn-sm btn-outline-success btn-Success"><svg
                                                xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path
                                                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fill-rule="evenodd"
                                                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                            <span class="visually-hidden"></span></router-link>

                                        <router-link :to="{ name: 'views.read', params: { id: post.id } }"><button
                                                class="btn btn-sm btn-outline-success btn-Success">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"></path>
                                                    <path
                                                        d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z">
                                                    </path>
                                                </svg>
                                                <span class="visually-hidden"></span>
                                            </button></router-link>
                                        <button @click.prevent="postDelete(post.id)"
                                            class="btn btn-sm btn-outline-success btn-Success"><svg
                                                xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                <path
                                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                <path fill-rule="evenodd"
                                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                            </svg>
                                            <span class="visually-hidden"></span></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'

export default {

    setup() {

        //reactive state
        let views = ref([])

        //mounted
        onMounted(() => {

            //panggil function "getDataPosts" 
            getDataviews()

        })

        //function "getDataPosts"
        function getDataviews() {

            //get API from Express Backend
            axios.get('http://localhost:3000/api/peminjaman_barang')
                .then(response => {

                    //assign state posts with response data
                    views.value = response.data.data

                }).catch(error => {
                    console.log(error.response.data)
                })
        }
        // function "postDelete"
        function postDelete(id) {

            //delete data post by ID
            axios.delete(`http://localhost:3000/api/peminjaman_barang/delete/${id}`)
                .then(() => {

                    //panggil function "getDataPosts"  
                    getDataviews()

                }).catch(error => {
                    console.log(error.response.data)
                })
        }

        //return
        return {
            views,
            getDataviews,
            postDelete
        }

    }

}
</script>
<style>
h4 {
    color: white;
}
</style>
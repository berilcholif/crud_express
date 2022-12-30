<template>
    <div class="container mt-custom">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body bg-dark">
                        <h4>DATA POST</h4>
                        <hr>
                        <router-link :to="{name: 'views.create'}" class="btn btn-md btn-success" style="float:right; margin-bottom: 30px;">TAMBAH DATA PEMINJAMAN</router-link>
                    
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
                                    <td class="text-center" >{{ post.tanggal_kembali }}</td>
                                    <td class="text-center">
                                    <router-link :to="{name: 'views.edit', params:{id: post.id }}" class="btn btn-sm btn-primary me-2">EDIT</router-link>
                                    <button @click.prevent="postDelete(post.id)" class="btn btn-sm btn-danger ml-1">DELETE</button>
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
h4{ color:  white;}
</style>
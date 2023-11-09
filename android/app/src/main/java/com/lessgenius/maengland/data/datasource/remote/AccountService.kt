package com.lessgenius.maengland.data.datasource.remote


import com.lessgenius.maengland.data.model.RequestCode
import com.lessgenius.maengland.data.model.Token
import retrofit2.http.Body
import retrofit2.http.POST

interface AccountService {

    @POST("auth/watch")
    suspend fun login(@Body watchCode: RequestCode): Token
}
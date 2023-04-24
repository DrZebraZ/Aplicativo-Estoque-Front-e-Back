/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package view;

import java.io.IOException;
import java.net.URI;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpEntityEnclosingRequestBase;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONObject;

//Conexão ao banco

/**
 *
 * @author luisandres
 */
public class ConnectionFactory {
    
    /**
     *
     * @param url
     * @return
     */
    public static String simpleGet(String url){
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpGet request = new HttpGet(url);
        HttpEntity entity = null;
        String result = null;
        try {
            CloseableHttpResponse response = httpClient.execute(request);
            entity = response.getEntity();
            result = EntityUtils.toString(entity);
            httpClient.close();
        } catch (IOException ex) {
            Logger.getLogger(ConnectionFactory.class.getName()).log(Level.SEVERE, null, ex);
        }
        return result;
    }

    /**
     *
     * @param url
     * @param jsonBody
     * @return
     * @throws IOException
     */
    public static String postJson(String url, JSONObject jsonBody) throws IOException {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost(url);
        HttpEntity entity = new StringEntity(jsonBody.toString());;
        String result = null;
        try{
            // Set the JSON payload as the body of the HttpPost request
            httpPost.setEntity(entity);
            httpPost.setHeader("Accept", "application/json");
            httpPost.setHeader("Content-type", "application/json");

            // Execute the HttpPost request and retrieve the CloseableHttpResponse object
            CloseableHttpResponse response = httpClient.execute(httpPost);

            // Retrieve the response body as a String
            String responseBody = EntityUtils.toString(response.getEntity());

            // Close the CloseableHttpResponse and CloseableHttpClient instances
            response.close();
            httpClient.close();

            // Return the response body as a String
            result = responseBody;
            
        }   catch (IOException ex) {
            Logger.getLogger(ConnectionFactory.class.getName()).log(Level.SEVERE, null, ex);
        }
        return result;
    }

    /**
     *
     * @param url
     * @param jsonBody
     * @return
     * @throws IOException
     */
    public static String putJson(String url, JSONObject jsonBody) throws IOException {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpPut httpPut = new HttpPut(url);
        HttpEntity entity = new StringEntity(jsonBody.toString());;
        String result = null;
        try{
            // Set the JSON payload as the body of the HttpPost request
            httpPut.setEntity(entity);
            httpPut.setHeader("Accept", "application/json");
            httpPut.setHeader("Content-type", "application/json");

            // Execute the HttpPost request and retrieve the CloseableHttpResponse object
            CloseableHttpResponse response = httpClient.execute(httpPut);

            // Retrieve the response body as a String
            String responseBody = EntityUtils.toString(response.getEntity());

            // Close the CloseableHttpResponse and CloseableHttpClient instances
            response.close();
            httpClient.close();

            // Return the response body as a String
            result = responseBody;
            
        }   catch (IOException ex) {
            Logger.getLogger(ConnectionFactory.class.getName()).log(Level.SEVERE, null, ex);
        }
        return result;
    }
    
    /**
     *
     * @param url
     * @param jsonBody
     * @return
     * @throws IOException
     */
    public static String deleteJson(String url, JSONObject jsonBody) throws IOException {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpDeleteWithBody httpDelete = new HttpDeleteWithBody(url);
        HttpEntity entity = new StringEntity(jsonBody.toString());;
        String result = null;
        try{
            // Set the JSON payload as the body of the HttpPost request
            httpDelete.setEntity(entity);
            httpDelete.setHeader("Accept", "application/json");
            httpDelete.setHeader("Content-type", "application/json");
            CloseableHttpResponse response = httpClient.execute(httpDelete);
            // Retrieve the response body as a String
            String responseBody = EntityUtils.toString(response.getEntity());

            // Close the CloseableHttpResponse and CloseableHttpClient instances
            response.close();
            httpClient.close();

            // Return the response body as a String
            result = responseBody;
            
        }   catch (IOException ex) {
            Logger.getLogger(ConnectionFactory.class.getName()).log(Level.SEVERE, null, ex);
        }
        return result;
    }
    
    /**
     *
     */
    public static class HttpDeleteWithBody extends HttpEntityEnclosingRequestBase {

        /**
         *
         */
        public static final String METHOD_NAME = "DELETE";

        /**
         *
         */
        public HttpDeleteWithBody() {
            super();
        }

        /**
         *
         * @param uri
         */
        public HttpDeleteWithBody(final URI uri) {
            super();
            setURI(uri);
        }

        /**
         *
         * @param uri
         */
        public HttpDeleteWithBody(final String uri) {
            super();
            setURI(URI.create(uri));
        }

        /**
         *
         * @return
         */
        @Override
        public String getMethod() {
            return METHOD_NAME;
        }
    }
}

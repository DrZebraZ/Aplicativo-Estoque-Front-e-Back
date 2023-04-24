/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package view;

import java.io.IOException;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Arrays;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.JOptionPane;

/**
 *
 * @author luisandres
 */
public class Config {
    private String host = "localhost";
    private String port = "3001";
    
    public Config(){
        try {
            Thread.sleep(500);
            InetAddress localHost = InetAddress.getLocalHost();
            this.host = localHost.getHostAddress();
        } catch (UnknownHostException e) {
            System.err.println("Erro 1");
        } catch (InterruptedException ex) {
            Logger.getLogger(Config.class.getName()).log(Level.SEVERE, null, ex);
        }
        tentaConnectar();
    }
    
    private void tentaConnectar(){
        try {     
            InetAddress inetAddress = InetAddress.getByName(this.host);
            Boolean continuar = true;
            try (Socket socket = new Socket()) {
                String host = this.host;
                Integer port = Integer.parseInt(this.port);
                InetSocketAddress address = new InetSocketAddress(host, port);
                socket.connect(address,200);
                continuar = false;
                return;
            } catch (UnknownHostException e) {
                System.out.println("Unknown host: " + host);
            } catch (IOException e) {
                System.out.println("Connection failed to " + host);
            }
            JOptionPane.showMessageDialog(null, "Erro ao conectar a: "+this.host+" Clique OK para iniciar busca a conexão!");
            while (continuar){
                for (int i = 2; i <= 254; i++) {
                    byte[] octets = inetAddress.getAddress();
                    octets[3] = (byte) i;
                    InetAddress currentAddress = InetAddress.getByAddress(octets);
                    System.out.println("Testing IP: " + currentAddress.getHostAddress());
                    this.host = currentAddress.getHostAddress();
                    String host = this.host;
                    Integer port = Integer.parseInt(this.port);
                    try (Socket socket = new Socket()) {
                        InetSocketAddress address = new InetSocketAddress(host, port);
                        socket.connect(address,200);
                        System.out.println("Connection successful to " + host);
                        continuar = false;
                        break;
                    } catch (UnknownHostException e) {
                        System.out.println("Unknown host: " + host);
                    } catch (IOException e) {
                        System.out.println("Connection failed to " + host);
                    }

                    // fazer alguma ação com o endereço IP atual
                }
            }
            JOptionPane.showMessageDialog(null, "Conexão estabelecida com: "+this.host+"! Clique OK para iniciar!!!");
        } catch (UnknownHostException ex) {
            Logger.getLogger(Config.class.getName()).log(Level.SEVERE, null, ex);
        }
        
    }
    
    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getPort() {
        return port;
    }

    public void setPort(String port) {
        this.port = port;
    }
    
}

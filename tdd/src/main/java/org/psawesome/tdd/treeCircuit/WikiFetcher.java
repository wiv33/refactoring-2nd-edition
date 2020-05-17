package org.psawesome.tdd.treeCircuit;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;

/**
 * package: org.psawesome.tdd.treeCircuit
 * author: PS
 * DATE: 2020-05-17 일요일 12:34
 */
public class WikiFetcher {
    private long lastRequestTime = -1;
    private long minInterval = 1000;

    // TODO singleton pattern

    public Elements fetchWikipedia(String url) {
        this.sleepIfNeeded();

        var conn = Jsoup.connect(url);
        Document doc = null;
        try {
            doc = conn.get();
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException();
        }

        Element content = doc.getElementById("mw-content-text");
        return content.select(".mw-parser-output p");
    }

    private void sleepIfNeeded() {
        if (lastRequestTime != -1) {
            long currentTime = System.currentTimeMillis();
            long nextRequestTime = lastRequestTime + minInterval;
            if (currentTime < nextRequestTime) {
                try {
                    Thread.sleep(nextRequestTime - currentTime);
                } catch (InterruptedException e) {
                    System.err.println("Warning: sleep interrupted in fetchWikipedia.");
                }
            }
        }
        lastRequestTime = System.currentTimeMillis();
    }
}

package org.psawesome.tdd.treeCircuit;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * package: org.psawesome.tdd.treeCircuit
 * author: PS
 * DATE: 2020-05-17 일요일 11:38
 */
class WikiNodeExamTest {


    @Test
    void testSelectJSoup() {
        Connection connect = Jsoup.connect("https://google.com");
        Assertions.assertNotNull(connect);
    }
}
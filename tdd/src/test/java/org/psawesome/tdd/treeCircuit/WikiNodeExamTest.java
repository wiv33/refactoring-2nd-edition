package org.psawesome.tdd.treeCircuit;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.Node;
import org.jsoup.nodes.TextNode;
import org.jsoup.select.Elements;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.Executor;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

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

    @Test
    void testConnectWiki() {
        String url = "https://en.wikipedia.org/wiki/Java_(programming_language)";

        // download and parse the document
        Connection conn = Jsoup.connect(url);
        Document doc = null;
        try {
            doc = conn.get();
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException();
        }

        // select the content text and pull out the paragraphs.
        Element content = doc.getElementById("mw-content-text");

        // TODO: avoid selecting paragraphs from sidebars and boxouts
        Elements paras = content.select(".mw-parser-output p");
        Element firstPara = paras.get(1);

        recursiveDFS(firstPara);
        System.out.println("============");

        iterativeDFS(firstPara);
        System.out.println("============");

        Iterable<Node> iter = new WikiNodeIterable(firstPara);
        for (Node node : iter) {
            if (node instanceof TextNode) {
                System.out.print(node);
            }
        }
    }

    private void iterativeDFS(Node root) {
        Deque<Node> stack = new ArrayDeque<Node>();
        stack.push(root);

        // if the stack is empty, we're done
        while (!stack.isEmpty()) {

            // otherwise pop the next Node off the stack
            Node node = stack.pop();
            if (node instanceof TextNode) {
                System.out.print(node);
            }

            // push the children onto the stack in reverse order
            List<Node> nodes = new ArrayList<Node>(node.childNodes());
            Collections.reverse(nodes);

            for (Node child : nodes) {
                stack.push(child);
            }
        }
    }

    private void recursiveDFS(Node node) {
        if (node instanceof TextNode) {
            System.out.print(node);
        }
        for (Node child : node.childNodes()) {
            recursiveDFS(child);
        }
    }
}
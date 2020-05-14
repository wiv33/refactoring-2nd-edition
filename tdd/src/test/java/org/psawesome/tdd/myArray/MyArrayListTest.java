package org.psawesome.tdd.myArray;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * package: org.psawesome.tdd.myArray
 * author: PS
 * DATE: 2020-05-14 목요일 20:57
 */
class MyArrayListTest {

    @Test
    void init() {
        MyArrayList list = new MyArrayList();
        assertNotNull(list);
    }
}
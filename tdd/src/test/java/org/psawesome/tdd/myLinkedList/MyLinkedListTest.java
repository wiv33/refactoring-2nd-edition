package org.psawesome.tdd.myLinkedList;

import org.junit.jupiter.api.BeforeEach;
import org.psawesome.tdd.myArray.MyArrayListTest;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

class MyLinkedListTest extends MyArrayListTest {

    /**
     * @throws java.lang.Exception
     */
    @BeforeEach
    public void setUp() throws Exception {
        list = new ArrayList<Integer>();
        list.add(1);
        list.add(2);
        list.add(3);

        mylist = new MyLinkedList<Integer>();
        mylist.addAll(list);
    }
}
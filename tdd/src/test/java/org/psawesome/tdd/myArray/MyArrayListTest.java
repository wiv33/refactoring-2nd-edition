package org.psawesome.tdd.myArray;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * package: org.psawesome.tdd.myArray
 * author: PS
 * DATE: 2020-05-14 목요일 20:57
 */
class MyArrayListTest {
    protected List<Integer> mylist;
    protected List<Integer> list;

    @BeforeEach
    void setUp() {
        list = new ArrayList<Integer>();
        list.add(1);
        list.add(2);
        list.add(3);

        mylist = new MyArrayList<Integer>();
        mylist.addAll(list);
    }

    @Test
    void init() {
        list = new MyArrayList<>();
        assertNotNull(list);
    }

    @Test
    public void testMyList() {
        Assertions.assertEquals(mylist.size(), 3);
    }

    /**
     * Test method for {@link MyArrayList#add(Object)}.
     */
    @Test
    public void testAddT() {
        for (int i = 4; i < 20; i++) {
            mylist.add(i);
        }
        //System.out.println(Arrays.toString(mal.toArray()));
        assertEquals(mylist.get(18), Integer.valueOf(19));
    }

    /**
     * Test method for {@link MyArrayList#add(int, Object)}.
     */
    @Test
    public void testAddIntT() {
        mylist.add(1, 5);
        //System.out.println(Arrays.toString(mal.toArray()));
        assertEquals(mylist.get(1), Integer.valueOf(5));
        assertEquals(mylist.size(), 4);

        try {
            mylist.set(-1, 0);
            fail();
        } catch (IndexOutOfBoundsException e) {} // good

        try {
            mylist.set(4, 0);
            fail();
        } catch (IndexOutOfBoundsException e) {} // good

        mylist.add(0, 6);
        //System.out.println(Arrays.toString(mal.toArray()));
        assertEquals(mylist.get(0), 6);

        mylist.add(5, 7);
        //System.out.println(Arrays.toString(mal.toArray()));
        assertEquals(mylist.get(5), Integer.valueOf(7));
    }

    /**
     * Test method for {@link MyArrayList#addAll(java.util.Collection)}.
     */
    @Test
    public void testAddAllCollectionOfQextendsT() {
        mylist.addAll(list);
        mylist.addAll(list);
        mylist.addAll(list);
        assertEquals(mylist.size(), 12);
        assertEquals(mylist.get(5), Integer.valueOf(3));
    }

    /**
     * Test method for {@link MyArrayList#clear()}.
     */
    @Test
    public void testClear() {
        mylist.clear();
        assertEquals(mylist.size(), 0);
    }

    /**
     * Test method for {@link MyArrayList#contains(Object)}.
     */
    @Test
    public void testContains() {
        assertEquals(mylist.contains(1), (true));
        assertEquals(mylist.contains(4), (false));
        assertEquals(mylist.contains(null), (false));
        mylist.add(null);
        assertEquals(mylist.contains(null), (true));
    }

    /**
     * Test method for {@link MyArrayList#containsAll(java.util.Collection)}.
     */
    @Test
    public void testContainsAll() {
        assertEquals(mylist.containsAll(list), (true));
    }

    /**
     * Test method for {@link MyArrayList#get(int)}.
     */
    @Test
    public void testGet() {
        assertEquals(mylist.get(1), (Integer.valueOf(2)));
    }

    /**
     * Test method for {@link MyArrayList#indexOf(Object)}.
     */
    @Test
    public void testIndexOf() {
        assertEquals(mylist.indexOf(1), (0));
        assertEquals(mylist.indexOf(2), (1));
        assertEquals(mylist.indexOf(3), (2));
        assertEquals(mylist.indexOf(4), (-1));
    }

    /**
     * Test method for {@link MyArrayList#indexOf(Object)}.
     */
    @Test
    public void testIndexOfNull() {
        assertEquals(mylist.indexOf(null), (-1));
        mylist.add(null);
        assertEquals(mylist.indexOf(null), (3));
    }

    /**
     * Test method for {@link MyArrayList#isEmpty()}.
     */
    @Test
    public void testIsEmpty() {
        assertEquals(mylist.isEmpty(), (false));
        mylist.clear();
        assertEquals(mylist.isEmpty(), (true));
    }

    /**
     * Test method for {@link MyArrayList#iterator()}.
     */
    @Test
    public void testIterator() {
        Iterator<Integer> iter = mylist.iterator();
        assertEquals(iter.next(), (Integer.valueOf(1)));
        assertEquals(iter.next(), (Integer.valueOf(2)));
        assertEquals(iter.next(), (Integer.valueOf(3)));
        assertEquals(iter.hasNext(), (false));
    }

    /**
     * Test method for {@link MyArrayList#lastIndexOf(Object)}.
     */
    @Test
    public void testLastIndexOf() {
        mylist.add(2);
        assertEquals(mylist.lastIndexOf(2), (3));
    }

    /**
     * Test method for {@link MyArrayList#remove(Object)}.
     */
    @Test
    public void testRemoveObject() {
        boolean flag = mylist.remove(Integer.valueOf(2));
        assertEquals(flag, (true));
        assertEquals(mylist.size(), (2));
        assertEquals(mylist.get(1), (Integer.valueOf(3)));
        //System.out.println(Arrays.toString(mal.toArray()));

        flag = mylist.remove(Integer.valueOf(1));
        assertEquals(flag, (true));
        assertEquals(mylist.size(), (1));
        assertEquals(mylist.get(0), (Integer.valueOf(3)));
        //System.out.println(Arrays.toString(mal.toArray()));

        flag = mylist.remove(Integer.valueOf(5));
        assertEquals(flag, (false));
        assertEquals(mylist.size(), (1));
        assertEquals(mylist.get(0), (Integer.valueOf(3)));
        //System.out.println(Arrays.toString(mal.toArray()));

        flag = mylist.remove(Integer.valueOf(3));
        assertEquals(flag, (true));
        assertEquals(mylist.size(), (0));
        //System.out.println(Arrays.toString(mal.toArray()));
    }

    /**
     * Test method for {@link MyArrayList#remove(int)}.
     */
    @Test
    public void testRemoveInt() {
        Integer val = mylist.remove(1);
        assertEquals(val, (Integer.valueOf(2)));
        assertEquals(mylist.size(), (2));
        assertEquals(mylist.get(1), (Integer.valueOf(3)));
    }

    /**
     * Test method for {@link MyArrayList#removeAll(java.util.Collection)}.
     */
    @Test
    public void testRemoveAll() {
        mylist.removeAll(list);
        assertEquals(mylist.size(), (0));
    }

    /**
     * Test method for {@link MyArrayList#set(int, Object)}.
     */
    @Test
    public void testSet() {
        Integer val = mylist.set(1, 5);
        assertEquals(val, (Integer.valueOf(2)));

        val = mylist.set(0, 6);
        assertEquals(val, (Integer.valueOf(1)));

        val = mylist.set(2, 7);
        assertEquals(val, (Integer.valueOf(3)));

        // return value should be 2
        // list should be [6, 5, 7]
        assertEquals(mylist.get(0), (Integer.valueOf(6)));
        assertEquals(mylist.get(1), (Integer.valueOf(5)));
        assertEquals(mylist.get(2), (Integer.valueOf(7)));
        //System.out.println(Arrays.toString(mal.toArray()));

        try {
            mylist.set(-1, 0);
            fail();
        } catch (IndexOutOfBoundsException e) {} // good

        try {
            mylist.set(4, 0);
            fail();
        } catch (IndexOutOfBoundsException e) {} // good
    }

    /**
     * Test method for {@link MyArrayList#size()}.
     */
    @Test
    public void testSize() {
        assertEquals(mylist.size(), (3));
    }

    /**
     * Test method for {@link MyArrayList#subList(int, int)}.
     */
    @Test
    public void testSubList() {
        mylist.addAll(list);
        List<Integer> sub = mylist.subList(1, 4);
        assertEquals(sub.get(1), (Integer.valueOf(3)));
    }

    /**
     * Test method for {@link MyArrayList#toArray()}.
     */
    @Test
    public void testToArray() {
        Object[] array = mylist.toArray();
        assertEquals((Integer)array[0], (Integer.valueOf(1)));
    }

}
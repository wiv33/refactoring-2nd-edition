package org.psawesome.tdd.profiler;

import lombok.AllArgsConstructor;
import org.jfree.data.xy.XYSeries;
import org.junit.jupiter.api.Test;
import org.psawesome.tdd.myLinkedList.MyLinkedList;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

/**
 * package: org.psawesome.tdd.profiler
 * author: PS
 * DATE: 2020-05-17 일요일 09:30
 */
class ProfileListAddTest {

    @Test
    void testProfileArrayListAdd() {
        ExecutorService es = Executors.newSingleThreadExecutor();
        es.execute(new ProfileRunner("ArrayList add end", 4000, 1000,
                new Profiler.Timeable() {
                    List<String> list;

                    @Override
                    public void setup(int n) {
                        list = new ArrayList<>();
                    }

                    @Override
                    public void timeMe(int n) {
                        for (int i = 0; i < n; i++) {
                            list.add("a string _ ");
                        }
                    }
                })::runProfiler
        );

        try {
            es.awaitTermination(1, TimeUnit.MINUTES);
        } catch (InterruptedException e) {
            throw new RuntimeException();
        }
    }

    @Test
    void testProfileArrayListFirstAdd() {
        ExecutorService es = Executors.newSingleThreadExecutor();
        es.execute(new ProfileRunner("ArrayList First add end", 4000, 10000,
                new Profiler.Timeable() {
                    List<String> list;

                    @Override
                    public void setup(int n) {
                        list = new ArrayList<>();
                    }

                    @Override
                    public void timeMe(int n) {
                        for (int i = 0; i < n; i++) {
                            list.add(0, "a string");
                        }
                    }
                })::runProfiler);

        try {
            es.awaitTermination(10, TimeUnit.MINUTES);
        } catch (InterruptedException e) {
            throw new RuntimeException();
        }
    }


    @Test
    void testProfileLinkedListAdd() {
        ExecutorService es = Executors.newSingleThreadExecutor();
        es.execute(new ProfileRunner("MyLinkedList add end", 64000, 1000,
                new Profiler.Timeable() {
                    List<String> list;

                    @Override
                    public void setup(int n) {
                        list = new MyLinkedList<>();
                    }

                    @Override
                    public void timeMe(int n) {
                        for (int i = 0; i < n; i++) {
                            list.add("a string _ ");
                        }
                    }
                })::runProfiler);

        try {
            es.awaitTermination(1, TimeUnit.MINUTES);
        } catch (InterruptedException e) {
            throw new RuntimeException();
        }
    }

    @Test
    void testProfileLinkedListFirstAdd() {
        ExecutorService es = Executors.newSingleThreadExecutor();
        es.execute(new ProfileRunner("MyLinkedList add end", 4000, 10000,
                new Profiler.Timeable() {
                    List<String> list;

                    @Override
                    public void setup(int n) {
                        list = new MyLinkedList<>();
                    }

                    @Override
                    public void timeMe(int n) {
                        for (int i = 0; i < n; i++) {
                            list.add(0, "a string _ ");
                        }
                    }
                })::runProfiler);

        try {
            es.awaitTermination(1, TimeUnit.MINUTES);
        } catch (InterruptedException e) {
            throw new RuntimeException();
        }
    }

    @AllArgsConstructor
    static class ProfileRunner {
        private String title;
        private int startN;
        private int endMillis; // 실행시간이 임계치를 초과하면 중단한다.
        private Profiler.Timeable timeable;

        public void runProfiler() {
            Profiler profiler = new Profiler(this.title, this.timeable);
            XYSeries xySeries = profiler.timingLoop(this.startN, this.endMillis);
            profiler.plotResults(xySeries);
        }
    }
}
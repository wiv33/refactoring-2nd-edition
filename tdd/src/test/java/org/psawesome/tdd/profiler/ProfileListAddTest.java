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
        es.execute(() -> {
            Profiler.Timeable timeable = new Profiler.Timeable() {
                List<String> list;

                @Override
                public void setup(int n) {
                    list = new ArrayList<>();
                }

                @Override
                public void timeMe(int n) {
                    for (int i = 0; i < n; i++) {
                        list.add("a string _ " + i);
                    }
                }
            };

            String title = "ArrayList add end";
            Profiler profiler = new Profiler(title, timeable);

            int startN = 4000;
            int endMillis = 1000;
            XYSeries series = profiler.timingLoop(startN, endMillis);
            profiler.plotResults(series);
        });

        try {
            es.awaitTermination(1, TimeUnit.MINUTES);
        } catch (InterruptedException e) {
            throw new RuntimeException();
        }
    }

    @Test
    void testProfileArrayListFirstAdd() {
        ExecutorService es = Executors.newSingleThreadExecutor();
        es.execute(() -> {
            Profiler.Timeable timeable = new Profiler.Timeable() {
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
            };
            String title = "ArrayList First add end";
            int startN = 4000,
                    endMillis = 10000;
            Profiler profiler = new Profiler(title, timeable);
            XYSeries xySeries = profiler.timingLoop(startN, endMillis);
            profiler.plotResults(xySeries);

        });

        try {
            es.awaitTermination(10, TimeUnit.MINUTES);
        } catch (InterruptedException e) {
            throw new RuntimeException();
        }
    }


    @Test
    void testProfileLinkedListAdd() {
        ExecutorService es = Executors.newSingleThreadExecutor();
        es.execute(() -> {
            Profiler.Timeable timeable = new Profiler.Timeable() {
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
            };
            String title = "MyLinkedList add end";
            int startN = 64000;
            int endMillis = 1000;

            Profiler profiler = new Profiler(title, timeable);
            XYSeries xySeries = profiler.timingLoop(startN, endMillis);
            profiler.plotResults(xySeries);
        });

        try {
            es.awaitTermination(1, TimeUnit.MINUTES);
        } catch (InterruptedException e) {
            throw new RuntimeException();
        }
    }

    @Test
    void testProfileLinkedListFirstAdd() {
        ExecutorService es = Executors.newSingleThreadExecutor();
        Profiler.Timeable timeable = new Profiler.Timeable() {
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
        };
        String title = "MyLinkedList add end";
        int startN = 4000;
        int endMillis = 10000;

        Profiler profiler = new Profiler(title, timeable);
        XYSeries xySeries = profiler.timingLoop(startN, endMillis);
        profiler.plotResults(xySeries);

        try {
            es.awaitTermination(1, TimeUnit.MINUTES);
        } catch (InterruptedException e) {
            throw new RuntimeException();
        }
    }

}

@AllArgsConstructor
class ProfileRunner {
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
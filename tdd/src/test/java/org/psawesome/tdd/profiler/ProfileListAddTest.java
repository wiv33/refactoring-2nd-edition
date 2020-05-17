package org.psawesome.tdd.profiler;

import org.jfree.data.xy.XYSeries;
import org.junit.jupiter.api.Test;

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
            Profiler.Timeable timetable = new Profiler.Timeable() {
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
            Profiler profiler = new Profiler(title, timetable);

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
}
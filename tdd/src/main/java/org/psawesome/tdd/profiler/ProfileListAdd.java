package org.psawesome.tdd.profiler;

import org.jfree.data.xy.XYSeries;

import java.util.ArrayList;
import java.util.List;

/**
 * package: org.psawesome.tdd.profiler
 * author: PS
 * DATE: 2020-05-17 일요일 09:30
 */
public class ProfileListAdd {

    public static void testProfileArrayListAdd() {
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

    }

    public static void main(String[] args) {
        testProfileArrayListAdd();
    }
}

package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class TeamTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Team getTeamSample1() {
        return new Team().id(1L).key(1L);
    }

    public static Team getTeamSample2() {
        return new Team().id(2L).key(2L);
    }

    public static Team getTeamRandomSampleGenerator() {
        return new Team().id(longCount.incrementAndGet()).key(longCount.incrementAndGet());
    }
}

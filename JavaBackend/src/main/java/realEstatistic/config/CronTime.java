package realEstatistic.config;

/**
 * This class defines the preset cron time to refresh data from Gov Data
 */
public class CronTime {
    /**
     * This defines the time to fetch data from Gov Data
     */
    public static final String fetchTime = "0 2 15 * * *";
    /**
     * This defines the time to update the districtInfo SQL table
     */
    public static final String updateTime = "0 3 15 * * *";
}

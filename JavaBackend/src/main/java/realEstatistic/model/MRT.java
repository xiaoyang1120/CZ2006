package realEstatistic.model;

import java.util.UUID;

public class MRT extends Facility{
    private UUID MRTStationId;
    private String MRTName;

    public UUID getMRTStationId() {
        return MRTStationId;
    }

    public void setMRTStationId(UUID MRTStationId) {
        this.MRTStationId = MRTStationId;
    }

    public String getMRTName() {
        return MRTName;
    }

    public void setMRTName(String MRTName) {
        this.MRTName = MRTName;
    }

    public void setLat(float lat) {
        this.lat = lat;
    }

    public void setLong_(float long_) {
        this.long_ = long_;
    }

    public MRT(UUID MRTStationId, String MRTName, float lat, float long_) {
        this.MRTStationId = MRTStationId;
        this.MRTName = MRTName;
        this.lat = lat;
        this.long_ = long_;
    }
}

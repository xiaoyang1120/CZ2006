package realEstatistic.model;

import java.util.UUID;

public class House {
    private UUID houseId;
    private String image;
    private String houseDescription;
    private UUID ownerId;
    private boolean isAvailable;
    private UUID districtId;
    private String venue;
    private Integer postal;

    public House(UUID houseId, String image, String houseDescription, UUID ownerId, boolean isAvalable, UUID districtId, String venue, Integer postal) {
        this.houseId = houseId;
        this.image = image;
        this.houseDescription = houseDescription;
        this.ownerId = ownerId;
        this.isAvailable = isAvalable;
        this.districtId = districtId;
        this.venue = venue;
        this.postal = postal;
    }

    public House() {
    }

    public UUID getHouseId() {
        return houseId;
    }

    public void setHouseId(UUID houseId) {
        this.houseId = houseId;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getHouseDescription() {
        return houseDescription;
    }

    public void setHouseDescription(String houseDescription) {
        this.houseDescription = houseDescription;
    }

    public UUID getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(UUID ownerId) {
        this.ownerId = ownerId;
    }

    public UUID getDistrictId() {
        return districtId;
    }

    public void setDistrictId(UUID districtId) {
        this.districtId = districtId;
    }

    public boolean getIsAvailable() {
        return isAvailable;
    }

    public void setIsAvailable(boolean available) {
        isAvailable = available;
    }

    public Integer getPostal() {
        return postal;
    }

    public void setPostal(Integer postal) {
        this.postal = postal;
    }

}

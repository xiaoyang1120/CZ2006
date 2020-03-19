package realEstatistic.model;

public class Criteria {
    private int criteriaId;
    private String criteriaName;

    public Criteria(int criteriaId, String criteriaName) {
        this.criteriaId = criteriaId;
        this.criteriaName = criteriaName;
    }

    public int getCriteriaId() {
        return criteriaId;
    }

    public void setCriteriaId(int criteriaId) {
        this.criteriaId = criteriaId;
    }

    public String getCriteriaName() {
        return criteriaName;
    }

    public void setCriteriaName(String criteriaName) {
        this.criteriaName = criteriaName;
    }
}

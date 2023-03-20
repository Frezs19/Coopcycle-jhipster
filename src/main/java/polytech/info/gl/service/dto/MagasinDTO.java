package polytech.info.gl.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link polytech.info.gl.domain.Magasin} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class MagasinDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 3)
    private String nom;

    @NotNull
    @Size(min = 10)
    private String adresse;

    private CooperativeDTO cooperative;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public CooperativeDTO getCooperative() {
        return cooperative;
    }

    public void setCooperative(CooperativeDTO cooperative) {
        this.cooperative = cooperative;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MagasinDTO)) {
            return false;
        }

        MagasinDTO magasinDTO = (MagasinDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, magasinDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MagasinDTO{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", adresse='" + getAdresse() + "'" +
            ", cooperative=" + getCooperative() +
            "}";
    }
}

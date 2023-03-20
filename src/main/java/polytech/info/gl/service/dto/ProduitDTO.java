package polytech.info.gl.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link polytech.info.gl.domain.Produit} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ProduitDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 3)
    private String nom;

    @NotNull
    @Size(min = 10)
    private String description;

    @NotNull
    private Integer prix;

    private MagasinDTO magasin;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPrix() {
        return prix;
    }

    public void setPrix(Integer prix) {
        this.prix = prix;
    }

    public MagasinDTO getMagasin() {
        return magasin;
    }

    public void setMagasin(MagasinDTO magasin) {
        this.magasin = magasin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProduitDTO)) {
            return false;
        }

        ProduitDTO produitDTO = (ProduitDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, produitDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProduitDTO{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", description='" + getDescription() + "'" +
            ", prix=" + getPrix() +
            ", magasin=" + getMagasin() +
            "}";
    }
}

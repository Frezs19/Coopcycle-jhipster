package polytech.info.gl.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import polytech.info.gl.domain.Produit;

/**
 * Spring Data JPA repository for the Produit entity.
 */
@Repository
public interface ProduitRepository extends JpaRepository<Produit, Long> {
    default Optional<Produit> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Produit> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Produit> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct produit from Produit produit left join fetch produit.magasin",
        countQuery = "select count(distinct produit) from Produit produit"
    )
    Page<Produit> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct produit from Produit produit left join fetch produit.magasin")
    List<Produit> findAllWithToOneRelationships();

    @Query("select produit from Produit produit left join fetch produit.magasin where produit.id =:id")
    Optional<Produit> findOneWithToOneRelationships(@Param("id") Long id);
}

package polytech.info.gl.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import polytech.info.gl.domain.Magasin;

/**
 * Spring Data JPA repository for the Magasin entity.
 */
@Repository
public interface MagasinRepository extends JpaRepository<Magasin, Long> {
    default Optional<Magasin> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Magasin> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Magasin> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct magasin from Magasin magasin left join fetch magasin.cooperative",
        countQuery = "select count(distinct magasin) from Magasin magasin"
    )
    Page<Magasin> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct magasin from Magasin magasin left join fetch magasin.cooperative")
    List<Magasin> findAllWithToOneRelationships();

    @Query("select magasin from Magasin magasin left join fetch magasin.cooperative where magasin.id =:id")
    Optional<Magasin> findOneWithToOneRelationships(@Param("id") Long id);
}

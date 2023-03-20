package polytech.info.gl.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import polytech.info.gl.domain.Cooperative;

/**
 * Spring Data JPA repository for the Cooperative entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CooperativeRepository extends JpaRepository<Cooperative, Long> {}

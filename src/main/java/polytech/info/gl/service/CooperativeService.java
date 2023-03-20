package polytech.info.gl.service;

import java.util.List;
import java.util.Optional;
import polytech.info.gl.service.dto.CooperativeDTO;

/**
 * Service Interface for managing {@link polytech.info.gl.domain.Cooperative}.
 */
public interface CooperativeService {
    /**
     * Save a cooperative.
     *
     * @param cooperativeDTO the entity to save.
     * @return the persisted entity.
     */
    CooperativeDTO save(CooperativeDTO cooperativeDTO);

    /**
     * Updates a cooperative.
     *
     * @param cooperativeDTO the entity to update.
     * @return the persisted entity.
     */
    CooperativeDTO update(CooperativeDTO cooperativeDTO);

    /**
     * Partially updates a cooperative.
     *
     * @param cooperativeDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CooperativeDTO> partialUpdate(CooperativeDTO cooperativeDTO);

    /**
     * Get all the cooperatives.
     *
     * @return the list of entities.
     */
    List<CooperativeDTO> findAll();

    /**
     * Get the "id" cooperative.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CooperativeDTO> findOne(Long id);

    /**
     * Delete the "id" cooperative.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

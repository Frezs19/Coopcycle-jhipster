package polytech.info.gl.service;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import polytech.info.gl.service.dto.MagasinDTO;

/**
 * Service Interface for managing {@link polytech.info.gl.domain.Magasin}.
 */
public interface MagasinService {
    /**
     * Save a magasin.
     *
     * @param magasinDTO the entity to save.
     * @return the persisted entity.
     */
    MagasinDTO save(MagasinDTO magasinDTO);

    /**
     * Updates a magasin.
     *
     * @param magasinDTO the entity to update.
     * @return the persisted entity.
     */
    MagasinDTO update(MagasinDTO magasinDTO);

    /**
     * Partially updates a magasin.
     *
     * @param magasinDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<MagasinDTO> partialUpdate(MagasinDTO magasinDTO);

    /**
     * Get all the magasins.
     *
     * @return the list of entities.
     */
    List<MagasinDTO> findAll();

    /**
     * Get all the magasins with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<MagasinDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" magasin.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MagasinDTO> findOne(Long id);

    /**
     * Delete the "id" magasin.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

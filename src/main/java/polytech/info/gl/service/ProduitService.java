package polytech.info.gl.service;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import polytech.info.gl.service.dto.ProduitDTO;

/**
 * Service Interface for managing {@link polytech.info.gl.domain.Produit}.
 */
public interface ProduitService {
    /**
     * Save a produit.
     *
     * @param produitDTO the entity to save.
     * @return the persisted entity.
     */
    ProduitDTO save(ProduitDTO produitDTO);

    /**
     * Updates a produit.
     *
     * @param produitDTO the entity to update.
     * @return the persisted entity.
     */
    ProduitDTO update(ProduitDTO produitDTO);

    /**
     * Partially updates a produit.
     *
     * @param produitDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ProduitDTO> partialUpdate(ProduitDTO produitDTO);

    /**
     * Get all the produits.
     *
     * @return the list of entities.
     */
    List<ProduitDTO> findAll();

    /**
     * Get all the produits with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ProduitDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" produit.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ProduitDTO> findOne(Long id);

    /**
     * Delete the "id" produit.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

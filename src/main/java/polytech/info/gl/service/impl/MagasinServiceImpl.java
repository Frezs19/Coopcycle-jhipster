package polytech.info.gl.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import polytech.info.gl.domain.Magasin;
import polytech.info.gl.repository.MagasinRepository;
import polytech.info.gl.service.MagasinService;
import polytech.info.gl.service.dto.MagasinDTO;
import polytech.info.gl.service.mapper.MagasinMapper;

/**
 * Service Implementation for managing {@link Magasin}.
 */
@Service
@Transactional
public class MagasinServiceImpl implements MagasinService {

    private final Logger log = LoggerFactory.getLogger(MagasinServiceImpl.class);

    private final MagasinRepository magasinRepository;

    private final MagasinMapper magasinMapper;

    public MagasinServiceImpl(MagasinRepository magasinRepository, MagasinMapper magasinMapper) {
        this.magasinRepository = magasinRepository;
        this.magasinMapper = magasinMapper;
    }

    @Override
    public MagasinDTO save(MagasinDTO magasinDTO) {
        log.debug("Request to save Magasin : {}", magasinDTO);
        Magasin magasin = magasinMapper.toEntity(magasinDTO);
        magasin = magasinRepository.save(magasin);
        return magasinMapper.toDto(magasin);
    }

    @Override
    public MagasinDTO update(MagasinDTO magasinDTO) {
        log.debug("Request to update Magasin : {}", magasinDTO);
        Magasin magasin = magasinMapper.toEntity(magasinDTO);
        magasin = magasinRepository.save(magasin);
        return magasinMapper.toDto(magasin);
    }

    @Override
    public Optional<MagasinDTO> partialUpdate(MagasinDTO magasinDTO) {
        log.debug("Request to partially update Magasin : {}", magasinDTO);

        return magasinRepository
            .findById(magasinDTO.getId())
            .map(existingMagasin -> {
                magasinMapper.partialUpdate(existingMagasin, magasinDTO);

                return existingMagasin;
            })
            .map(magasinRepository::save)
            .map(magasinMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MagasinDTO> findAll() {
        log.debug("Request to get all Magasins");
        return magasinRepository.findAll().stream().map(magasinMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    public Page<MagasinDTO> findAllWithEagerRelationships(Pageable pageable) {
        return magasinRepository.findAllWithEagerRelationships(pageable).map(magasinMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<MagasinDTO> findOne(Long id) {
        log.debug("Request to get Magasin : {}", id);
        return magasinRepository.findOneWithEagerRelationships(id).map(magasinMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Magasin : {}", id);
        magasinRepository.deleteById(id);
    }
}

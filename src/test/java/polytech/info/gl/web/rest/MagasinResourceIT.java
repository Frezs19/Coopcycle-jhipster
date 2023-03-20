package polytech.info.gl.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import polytech.info.gl.IntegrationTest;
import polytech.info.gl.domain.Magasin;
import polytech.info.gl.repository.MagasinRepository;
import polytech.info.gl.service.MagasinService;
import polytech.info.gl.service.dto.MagasinDTO;
import polytech.info.gl.service.mapper.MagasinMapper;

/**
 * Integration tests for the {@link MagasinResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class MagasinResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESSE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/magasins";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MagasinRepository magasinRepository;

    @Mock
    private MagasinRepository magasinRepositoryMock;

    @Autowired
    private MagasinMapper magasinMapper;

    @Mock
    private MagasinService magasinServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMagasinMockMvc;

    private Magasin magasin;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Magasin createEntity(EntityManager em) {
        Magasin magasin = new Magasin().nom(DEFAULT_NOM).adresse(DEFAULT_ADRESSE);
        return magasin;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Magasin createUpdatedEntity(EntityManager em) {
        Magasin magasin = new Magasin().nom(UPDATED_NOM).adresse(UPDATED_ADRESSE);
        return magasin;
    }

    @BeforeEach
    public void initTest() {
        magasin = createEntity(em);
    }

    @Test
    @Transactional
    void createMagasin() throws Exception {
        int databaseSizeBeforeCreate = magasinRepository.findAll().size();
        // Create the Magasin
        MagasinDTO magasinDTO = magasinMapper.toDto(magasin);
        restMagasinMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(magasinDTO)))
            .andExpect(status().isCreated());

        // Validate the Magasin in the database
        List<Magasin> magasinList = magasinRepository.findAll();
        assertThat(magasinList).hasSize(databaseSizeBeforeCreate + 1);
        Magasin testMagasin = magasinList.get(magasinList.size() - 1);
        assertThat(testMagasin.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testMagasin.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
    }

    @Test
    @Transactional
    void createMagasinWithExistingId() throws Exception {
        // Create the Magasin with an existing ID
        magasin.setId(1L);
        MagasinDTO magasinDTO = magasinMapper.toDto(magasin);

        int databaseSizeBeforeCreate = magasinRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMagasinMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(magasinDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Magasin in the database
        List<Magasin> magasinList = magasinRepository.findAll();
        assertThat(magasinList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = magasinRepository.findAll().size();
        // set the field null
        magasin.setNom(null);

        // Create the Magasin, which fails.
        MagasinDTO magasinDTO = magasinMapper.toDto(magasin);

        restMagasinMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(magasinDTO)))
            .andExpect(status().isBadRequest());

        List<Magasin> magasinList = magasinRepository.findAll();
        assertThat(magasinList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkAdresseIsRequired() throws Exception {
        int databaseSizeBeforeTest = magasinRepository.findAll().size();
        // set the field null
        magasin.setAdresse(null);

        // Create the Magasin, which fails.
        MagasinDTO magasinDTO = magasinMapper.toDto(magasin);

        restMagasinMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(magasinDTO)))
            .andExpect(status().isBadRequest());

        List<Magasin> magasinList = magasinRepository.findAll();
        assertThat(magasinList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllMagasins() throws Exception {
        // Initialize the database
        magasinRepository.saveAndFlush(magasin);

        // Get all the magasinList
        restMagasinMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(magasin.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].adresse").value(hasItem(DEFAULT_ADRESSE)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllMagasinsWithEagerRelationshipsIsEnabled() throws Exception {
        when(magasinServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restMagasinMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(magasinServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllMagasinsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(magasinServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restMagasinMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(magasinRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getMagasin() throws Exception {
        // Initialize the database
        magasinRepository.saveAndFlush(magasin);

        // Get the magasin
        restMagasinMockMvc
            .perform(get(ENTITY_API_URL_ID, magasin.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(magasin.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.adresse").value(DEFAULT_ADRESSE));
    }

    @Test
    @Transactional
    void getNonExistingMagasin() throws Exception {
        // Get the magasin
        restMagasinMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingMagasin() throws Exception {
        // Initialize the database
        magasinRepository.saveAndFlush(magasin);

        int databaseSizeBeforeUpdate = magasinRepository.findAll().size();

        // Update the magasin
        Magasin updatedMagasin = magasinRepository.findById(magasin.getId()).get();
        // Disconnect from session so that the updates on updatedMagasin are not directly saved in db
        em.detach(updatedMagasin);
        updatedMagasin.nom(UPDATED_NOM).adresse(UPDATED_ADRESSE);
        MagasinDTO magasinDTO = magasinMapper.toDto(updatedMagasin);

        restMagasinMockMvc
            .perform(
                put(ENTITY_API_URL_ID, magasinDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(magasinDTO))
            )
            .andExpect(status().isOk());

        // Validate the Magasin in the database
        List<Magasin> magasinList = magasinRepository.findAll();
        assertThat(magasinList).hasSize(databaseSizeBeforeUpdate);
        Magasin testMagasin = magasinList.get(magasinList.size() - 1);
        assertThat(testMagasin.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testMagasin.getAdresse()).isEqualTo(UPDATED_ADRESSE);
    }

    @Test
    @Transactional
    void putNonExistingMagasin() throws Exception {
        int databaseSizeBeforeUpdate = magasinRepository.findAll().size();
        magasin.setId(count.incrementAndGet());

        // Create the Magasin
        MagasinDTO magasinDTO = magasinMapper.toDto(magasin);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMagasinMockMvc
            .perform(
                put(ENTITY_API_URL_ID, magasinDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(magasinDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Magasin in the database
        List<Magasin> magasinList = magasinRepository.findAll();
        assertThat(magasinList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMagasin() throws Exception {
        int databaseSizeBeforeUpdate = magasinRepository.findAll().size();
        magasin.setId(count.incrementAndGet());

        // Create the Magasin
        MagasinDTO magasinDTO = magasinMapper.toDto(magasin);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMagasinMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(magasinDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Magasin in the database
        List<Magasin> magasinList = magasinRepository.findAll();
        assertThat(magasinList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMagasin() throws Exception {
        int databaseSizeBeforeUpdate = magasinRepository.findAll().size();
        magasin.setId(count.incrementAndGet());

        // Create the Magasin
        MagasinDTO magasinDTO = magasinMapper.toDto(magasin);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMagasinMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(magasinDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Magasin in the database
        List<Magasin> magasinList = magasinRepository.findAll();
        assertThat(magasinList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMagasinWithPatch() throws Exception {
        // Initialize the database
        magasinRepository.saveAndFlush(magasin);

        int databaseSizeBeforeUpdate = magasinRepository.findAll().size();

        // Update the magasin using partial update
        Magasin partialUpdatedMagasin = new Magasin();
        partialUpdatedMagasin.setId(magasin.getId());

        restMagasinMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMagasin.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMagasin))
            )
            .andExpect(status().isOk());

        // Validate the Magasin in the database
        List<Magasin> magasinList = magasinRepository.findAll();
        assertThat(magasinList).hasSize(databaseSizeBeforeUpdate);
        Magasin testMagasin = magasinList.get(magasinList.size() - 1);
        assertThat(testMagasin.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testMagasin.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
    }

    @Test
    @Transactional
    void fullUpdateMagasinWithPatch() throws Exception {
        // Initialize the database
        magasinRepository.saveAndFlush(magasin);

        int databaseSizeBeforeUpdate = magasinRepository.findAll().size();

        // Update the magasin using partial update
        Magasin partialUpdatedMagasin = new Magasin();
        partialUpdatedMagasin.setId(magasin.getId());

        partialUpdatedMagasin.nom(UPDATED_NOM).adresse(UPDATED_ADRESSE);

        restMagasinMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMagasin.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMagasin))
            )
            .andExpect(status().isOk());

        // Validate the Magasin in the database
        List<Magasin> magasinList = magasinRepository.findAll();
        assertThat(magasinList).hasSize(databaseSizeBeforeUpdate);
        Magasin testMagasin = magasinList.get(magasinList.size() - 1);
        assertThat(testMagasin.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testMagasin.getAdresse()).isEqualTo(UPDATED_ADRESSE);
    }

    @Test
    @Transactional
    void patchNonExistingMagasin() throws Exception {
        int databaseSizeBeforeUpdate = magasinRepository.findAll().size();
        magasin.setId(count.incrementAndGet());

        // Create the Magasin
        MagasinDTO magasinDTO = magasinMapper.toDto(magasin);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMagasinMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, magasinDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(magasinDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Magasin in the database
        List<Magasin> magasinList = magasinRepository.findAll();
        assertThat(magasinList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMagasin() throws Exception {
        int databaseSizeBeforeUpdate = magasinRepository.findAll().size();
        magasin.setId(count.incrementAndGet());

        // Create the Magasin
        MagasinDTO magasinDTO = magasinMapper.toDto(magasin);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMagasinMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(magasinDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Magasin in the database
        List<Magasin> magasinList = magasinRepository.findAll();
        assertThat(magasinList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMagasin() throws Exception {
        int databaseSizeBeforeUpdate = magasinRepository.findAll().size();
        magasin.setId(count.incrementAndGet());

        // Create the Magasin
        MagasinDTO magasinDTO = magasinMapper.toDto(magasin);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMagasinMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(magasinDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Magasin in the database
        List<Magasin> magasinList = magasinRepository.findAll();
        assertThat(magasinList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMagasin() throws Exception {
        // Initialize the database
        magasinRepository.saveAndFlush(magasin);

        int databaseSizeBeforeDelete = magasinRepository.findAll().size();

        // Delete the magasin
        restMagasinMockMvc
            .perform(delete(ENTITY_API_URL_ID, magasin.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Magasin> magasinList = magasinRepository.findAll();
        assertThat(magasinList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

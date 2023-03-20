import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Magasin e2e test', () => {
  const magasinPageUrl = '/magasin';
  const magasinPageUrlPattern = new RegExp('/magasin(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const magasinSample = { nom: 'forecast Bedfordshire', adresse: 'Buckinghamshire Ergonomic Tasty' };

  let magasin;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/magasins+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/magasins').as('postEntityRequest');
    cy.intercept('DELETE', '/api/magasins/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (magasin) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/magasins/${magasin.id}`,
      }).then(() => {
        magasin = undefined;
      });
    }
  });

  it('Magasins menu should load Magasins page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('magasin');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Magasin').should('exist');
    cy.url().should('match', magasinPageUrlPattern);
  });

  describe('Magasin page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(magasinPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Magasin page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/magasin/new$'));
        cy.getEntityCreateUpdateHeading('Magasin');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', magasinPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/magasins',
          body: magasinSample,
        }).then(({ body }) => {
          magasin = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/magasins+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [magasin],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(magasinPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Magasin page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('magasin');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', magasinPageUrlPattern);
      });

      it('edit button click should load edit Magasin page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Magasin');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', magasinPageUrlPattern);
      });

      it('edit button click should load edit Magasin page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Magasin');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', magasinPageUrlPattern);
      });

      it('last delete button click should delete instance of Magasin', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('magasin').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', magasinPageUrlPattern);

        magasin = undefined;
      });
    });
  });

  describe('new Magasin page', () => {
    beforeEach(() => {
      cy.visit(`${magasinPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Magasin');
    });

    it('should create an instance of Magasin', () => {
      cy.get(`[data-cy="nom"]`).type('Intelligent Analyste Fresh').should('have.value', 'Intelligent Analyste Fresh');

      cy.get(`[data-cy="adresse"]`).type('azure Sleek teal').should('have.value', 'azure Sleek teal');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        magasin = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', magasinPageUrlPattern);
    });
  });
});

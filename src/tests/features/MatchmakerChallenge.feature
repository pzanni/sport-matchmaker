Feature: Typical scenarios

  Scenario: Check other player
    Given I log into matchmaker page
    When I choose all opponents
    Then I can check individual users profile

# Scenario: Succesful challenge
# Scenario: Unsuccesful challenge due to existing challenge
# Scenario: Unsuccesful challenge due to user not accepting challenges
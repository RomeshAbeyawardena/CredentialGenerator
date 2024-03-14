<script setup lang="ts">
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Checkbox from 'primevue/checkbox';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import { useConfigurationStore } from '../stores/ConfigurationStore';
import { ref } from "vue";
import { CharacterType, toList } from '../enumerations/CharacterType';
import { NumberService } from '../services/NumberService';
import { StringService } from '../services/StringService';

const stringService = new StringService(new NumberService());
const dataSource = toList(stringService);

const store = useConfigurationStore();

const userTypeSelection = ref(store.user.type as number);
const passwordTypeSelection = ref(store.password.type as number);

function onPaswordTypeSelection_Updated(e:any) : void {
    store.password.type = e as CharacterType;
}

function onUserTypeSelection_Updated(e:any) : void {
    store.user.type = e as CharacterType;
}

</script>
<template>
    <Accordion :activeIndex="0">
        <AccordionTab header="Configuration Settings">
            <form>
                <h3>Username Settings</h3>
                <div class="control-group">
                    <label for="characterLength">Character length: </label>
                    <InputNumber    class="w-full" 
                                    input-id="characterLength"
                                    v-model="store.user.length"
                                    buttonLayout="horizontal" 
                                    :step="1" 
                                    showButtons>
                        <template #incrementbuttonicon>
                            <span class="pi pi-plus" />
                        </template>
                        <template #decrementbuttonicon>
                            <span class="pi pi-minus" />
                        </template>
                    </InputNumber>
                </div>
                <div class="control-group">
                    <label for="characterType">Type:</label>
                    <Dropdown   class="w-full" 
                                @update:modelValue="onUserTypeSelection_Updated"
                                v-model="userTypeSelection" 
                                :options="dataSource" 
                                input-id="characterType"
                                option-label="label" 
                                option-value="value"
                                placeholder="Select Type" />
                </div>
                <div class="checkbox-control-group">
                    <Checkbox   v-model="store.user.mustStartWithAlphaNumeric"
                                input-id="mustStartWithAlphaNumeric"
                                :binary="true" />
                    <label for="mustStartWithAlphaNumeric">Must start with an alphanumeric character</label>
                </div>
                <h3>Password Settings</h3>
                <div class="control-group">
                    <label for="passwordCharacterLength">Character length: </label>
                    <InputNumber    class="w-full" 
                                    v-model="store.password.length" 
                                    buttonLayout="horizontal" 
                                    input-id="passwordCharacterLength"
                                    :step="1" 
                                    showButtons>
                        <template #incrementbuttonicon>
                            <span class="pi pi-plus" />
                        </template>
                        <template #decrementbuttonicon>
                            <span class="pi pi-minus" />
                        </template>
                    </InputNumber>
                </div>
                <div class="control-group">
                    <label for="passwordCharacterType">Type:</label>
                    <Dropdown   class="w-full"
                                @update:modelValue="onPaswordTypeSelection_Updated" 
                                v-model="passwordTypeSelection" 
                                :options="dataSource" 
                                input-id="passwordCharacterType"
                                option-label="label" 
                                option-value="value"
                                placeholder="Select Type" />
                </div>
                <div class="checkbox-control-group">
                    <div class="flex align-items-center">
                        <Checkbox   v-model="store.password.mustHaveAtLeastOneNumber"
                                    input-id="mustHaveAtLeastOneNumber"
                                    :binary="true" />
                        <label for="mustHaveAtLeastOneNumber">Must have at least one number</label>
                    </div>
                </div>
                <div class="checkbox-control-group">
                    <Checkbox   v-model="store.password.mustHaveAtLeastOneSymbol"
                                :binary="true"
                                input-id="mustHaveAtLeastOneSymbol" />
                    <label for="mustHaveAtLeastOneSymbol">Must have at least one symbol</label>
                </div>
            </form>
        </AccordionTab>
    </Accordion>
</template>
<style lang="scss" scoped>
    h3 {
        margin: 0;
        padding: 0;

        &:not(:first-child) {
            margin-top: 1rem;
        }
    }
    div.control-group
    {
        label {
            display: block;
            margin-bottom: 0.5rem;
        }
    }

    div.checkbox-control-group {
        label {
            margin-left: 0.5rem;
        }
    }

    h3,
    div.checkbox-control-group,
    div.control-group {
        margin-bottom: 0.5rem;
    }
</style>
<script setup lang="ts">
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import { useConfigurationStore } from '../stores/ConfigurationStore';
import { ref } from "vue";
import { CharacterType } from '../enumerations/CharacterType';
import { NumberService } from '../services/NumberService';
import { StringService } from '../services/StringService';

const stringService = new StringService(new NumberService());
const dataSource = ref(Object.values(CharacterType)
                             .filter(value => typeof value === 'string')
                             .map((e, i) => {
    return {
        value: i,
        label: stringService.addSpacesToCamelCase(e.toLocaleString())
    }
}));

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
                    <label>Character length: </label>
                    <InputNumber    class="w-full" 
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
                    <label>Type:</label>
                    <Dropdown   class="w-full" 
                                @update:modelValue="onUserTypeSelection_Updated"
                                v-model="userTypeSelection" 
                                :options="dataSource" 
                                option-label="label" 
                                option-value="value"
                                placeholder="Select Type" />
                </div>
                <h3>Password Settings</h3>
                <div class="control-group">
                    <label>Character length: </label>
                    <InputNumber    class="w-full" 
                                    v-model="store.password.length" 
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
                    <label>Type:</label>
                    <Dropdown   class="w-full"
                                @update:modelValue="onPaswordTypeSelection_Updated" 
                                v-model="passwordTypeSelection" 
                                :options="dataSource" 
                                option-label="label" 
                                option-value="value"
                                placeholder="Select Type" />
                </div>
            </form>
        </AccordionTab>
    </Accordion>
</template>
<style scoped>
    h3 {
        margin: 0;
        padding: 0;
    }

    label {
        display: block;
    }
    h3,
    label,
    div.control-group {
        margin-bottom: 0.5rem;
    }
</style>